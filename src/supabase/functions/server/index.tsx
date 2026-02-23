import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c55d007a/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTHENTICATION ENDPOINTS ============

// Register new user (Patient or Clinician)
app.post("/make-server-c55d007a/auth/register", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();

    if (!email || !password || !name || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // ✅ Use signUp (NOT admin.createUser)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: "http://localhost:3000", // 🔥 CHANGE to your Vercel domain later
      },
    });

    if (error) {
      console.log("Registration error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({
      message: "Registration successful. Check your email to confirm your account.",
      user: data.user,
    });
  } catch (error) {
    console.log("Registration error:", error);
    return c.json({ error: "Registration failed: " + error.message }, 500);
  }
});

// Login user
app.post("/make-server-c55d007a/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Login error:', error);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Get user metadata
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({
      message: 'Login successful',
      token: data.session.access_token,
      user: userData || {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || 'User',
        role: data.user.user_metadata?.role || 'patient',
      }
    });
  } catch (error) {
    console.log('Login error:', error);
    return c.json({ error: 'Login failed: ' + error.message }, 500);
  }
});

// ============ ADR REPORTS ENDPOINTS ============

// Submit new ADR report
app.post("/make-server-c55d007a/reports/submit", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (!user || authError) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const reportData = await c.req.json();

    // ✅ Save into Supabase DB table
    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          user_id: user.id,
          ...reportData,
          status: "Under Review",
          date_reported: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.log("DB insert error:", error);
      return c.json({ error: "Failed to save report" }, 500);
    }

    return c.json({
      message: "Report submitted successfully",
    });
  } catch (error) {
    console.log("Report submission error:", error);
    return c.json({ error: "Failed to submit report: " + error.message }, 500);
  }
});

// Get all reports (for clinicians)
app.get("/make-server-c55d007a/reports/all", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify user is a clinician or admin
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'clinician' && userData?.role !== 'admin') {
      return c.json({ error: 'Access denied. Clinician access required.' }, 403);
    }

    // Get all reports
    const allReports = await kv.getByPrefix('report:');

    // 🔥 AUTO-CLEANUP: Delete reviewed reports older than 1 hour (ONLY for clinicians, NOT admin)
    if (userData?.role === 'clinician') {
      const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour in milliseconds
      
      for (const report of allReports) {
        if (report.status === 'Reviewed' && report.reviewedAt) {
          const reviewedTime = new Date(report.reviewedAt).getTime();
          if (reviewedTime < oneHourAgo) {
            // Archive report before deleting (so admin can still see it)
            await kv.set(`archived_report:${report.id}`, {
              ...report,
              archivedAt: new Date().toISOString(),
            });
            
            // Delete old reviewed report from active reports
            await kv.del(`report:${report.id}`);
            console.log(`Auto-deleted reviewed report #${report.id} (reviewed > 1 hour ago)`);
          }
        }
      }
    }

    // Get fresh reports after cleanup
    const freshReports = await kv.getByPrefix('report:');

    return c.json({ reports: freshReports });
  } catch (error) {
    console.log('Fetch all reports error:', error);
    return c.json({ error: 'Failed to fetch reports: ' + error.message }, 500);
  }
});

// Update report status (for clinicians)
app.put("/make-server-c55d007a/reports/:id/status", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify user is a clinician
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'clinician') {
      return c.json({ error: 'Access denied. Clinician access required.' }, 403);
    }

    const reportId = c.req.param('id');
    const { status } = await c.req.json();

    // Get existing report
    const report = await kv.get(`report:${reportId}`);
    if (!report) {
      return c.json({ error: 'Report not found' }, 404);
    }

    // Update report with new status
    const updatedReport = {
      ...report,
      status,
      // 🔥 Add reviewedAt timestamp when marked as Reviewed
      ...(status === 'Reviewed' ? { reviewedAt: new Date().toISOString() } : {}),
      lastUpdated: new Date().toISOString(),
      reviewedBy: userData.name,
    };

    await kv.set(`report:${reportId}`, updatedReport);

    return c.json({
      message: 'Report status updated successfully',
      report: updatedReport,
    });
  } catch (error) {
    console.log('Update report status error:', error);
    return c.json({ error: 'Failed to update report status: ' + error.message }, 500);
  }
});

// Cleanup endpoint - Delete all reviewed reports older than 1 hour
app.post("/make-server-c55d007a/reports/cleanup", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const allReports = await kv.getByPrefix('report:');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    let deletedCount = 0;
    
    for (const report of allReports) {
      if (report.status === 'Reviewed' && report.reviewedAt) {
        const reviewedTime = new Date(report.reviewedAt).getTime();
        if (reviewedTime < oneHourAgo) {
          await kv.del(`report:${report.id}`);
          deletedCount++;
          console.log(`Cleaned up reviewed report #${report.id}`);
        }
      }
    }

    return c.json({
      message: `Cleanup completed. Deleted ${deletedCount} old reviewed reports.`,
      deletedCount,
    });
  } catch (error) {
    console.log('Cleanup error:', error);
    return c.json({ error: 'Cleanup failed: ' + error.message }, 500);
  }
});

// ============ ADMIN ENDPOINTS ============

// Get all users (admin only)
app.get("/make-server-c55d007a/admin/users", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify user is admin
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: 'Access denied. Admin access required.' }, 403);
    }

    // Get all users
    const allUsers = await kv.getByPrefix('user:');
    
    // Count reports for each user
    const allReports = await kv.getByPrefix('report:');
    const usersWithCounts = allUsers.map(user => {
      const userReportsCount = allReports.filter(r => r.userId === user.id).length;
      return { ...user, reportsCount: userReportsCount };
    });

    return c.json({ users: usersWithCounts });
  } catch (error) {
    console.log('Fetch users error:', error);
    return c.json({ error: 'Failed to fetch users: ' + error.message }, 500);
  }
});

// Get all reports including archived (admin only)
app.get("/make-server-c55d007a/admin/reports", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify user is admin
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: 'Access denied. Admin access required.' }, 403);
    }

    // Get all active reports
    const activeReports = await kv.getByPrefix('report:');
    
    // Get all archived reports
    const archivedReports = await kv.getByPrefix('archived_report:');

    return c.json({ 
      activeReports,
      archivedReports,
      totalReports: activeReports.length + archivedReports.length,
    });
  } catch (error) {
    console.log('Fetch admin reports error:', error);
    return c.json({ error: 'Failed to fetch reports: ' + error.message }, 500);
  }
});

// Get analytics data (admin only)
app.get("/make-server-c55d007a/admin/analytics", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Verify user is admin
    const userData = await kv.get(`user:${user.id}`);
    if (userData?.role !== 'admin') {
      return c.json({ error: 'Access denied. Admin access required.' }, 403);
    }

    const allUsers = await kv.getByPrefix('user:');
    const allReports = await kv.getByPrefix('report:');
    const archivedReports = await kv.getByPrefix('archived_report:');

    // Calculate statistics
    const totalUsers = allUsers.length;
    const totalPatients = allUsers.filter(u => u.role === 'patient').length;
    const totalClinicians = allUsers.filter(u => u.role === 'clinician').length;
    const totalReports = allReports.length + archivedReports.length;
    const pendingReports = allReports.filter(r => r.status === 'Under Review').length;
    const reviewedReports = allReports.filter(r => r.status === 'Reviewed').length + archivedReports.length;

    // Drug statistics
    const allReportsData = [...allReports, ...archivedReports];
    const drugStats = {};
    const severityStats = { Mild: 0, Moderate: 0, Severe: 0, Critical: 0 };

    allReportsData.forEach(report => {
      drugStats[report.drug] = (drugStats[report.drug] || 0) + 1;
      severityStats[report.severity]++;
    });

    return c.json({
      users: { total: totalUsers, patients: totalPatients, clinicians: totalClinicians },
      reports: { total: totalReports, pending: pendingReports, reviewed: reviewedReports },
      drugStats,
      severityStats,
    });
  } catch (error) {
    console.log('Fetch analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics: ' + error.message }, 500);
  }
});

Deno.serve(app.fetch);