import React, { useState, useEffect } from 'react';
import { CompleteDemoLanding } from './components/CompleteDemoLanding';
import { NewLandingPage } from './components/NewLandingPage';
import { ModernLandingPage } from './components/ModernLandingPage';
import { SimplifiedLandingPage } from './components/SimplifiedLandingPage';
import { EnhancedLoginPage } from './components/EnhancedLoginPage';
import { EnhancedRegisterPage } from './components/EnhancedRegisterPage';
import { EmailConfirmationPage } from './components/EmailConfirmationPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PatientDashboard } from './components/PatientDashboard';
import { ClinicianDashboard } from './components/ClinicianDashboard';
import { AppNavbar } from './components/AppNavbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { AIChatWidget } from './components/AIChatWidget';
import { FullScreenAIChat } from './components/FullScreenAIChat';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { OurTeamPage } from './components/OurTeamPage';
import { QuickReportingPage } from './components/QuickReportingPage';
import { EnhancedQuickReportingPage } from './components/EnhancedQuickReportingPage';
import { ClinicianReportForm } from './components/ClinicianReportForm';
import { AISeverityPage } from './components/AISeverityPage';
import { SecureAccountsPage } from './components/SecureAccountsPage';
import { AIFeaturesPage } from './components/AIFeaturesPage';
import { AIHealthcareAutomationPage } from './components/AIHealthcareAutomationPage';
import { PharmaceuticalsOncologyPage } from './components/PharmaceuticalsOncologyPage';
import { DrugStandardizationPage } from './components/DrugStandardizationPage';
import { ResearchKnowledgePage } from './components/ResearchKnowledgePage';
import { DosageCalculatorPage } from './components/DosageCalculatorPage';
import { DrugDatabase } from './components/DrugDatabase';
import { PatientSettings } from './components/PatientSettings';
import { logoutUser } from './services/api';

// Report interface
export interface Report {
  id: number;
  patientName: string;
  patientEmail: string;
  drug: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  symptoms: string;
  dateReported: string;
  status: 'Under Review' | 'Reviewed' | 'Closed' | 'Urgent';
  aiAnalyzed: boolean;
  aiSuggestion?: string;
  priority: number; // 1 = highest
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export default function App() {
  // Main state: DEMO or APP mode
  const [viewMode, setViewMode] = useState<'demo' | 'app'>('demo');
  const [currentPage, setCurrentPage] = useState('Home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'clinician' | 'admin' | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // Shared reports state - Empty on production, will be populated from database
  const [reports, setReports] = useState<Report[]>([]);

  const addReport = (report: Report) => {
    setReports([report, ...reports]);
  };

  const updateReportStatus = (reportId: number, newStatus: 'Under Review' | 'Reviewed' | 'Closed' | 'Urgent') => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // From DEMO: Click any button → Go to Login/Register
  const handleDemoGetStarted = () => {
    setViewMode('app');
    setCurrentPage('Register');
  };

  const handleDemoLogin = () => {
    setViewMode('app');
    setCurrentPage('Login');
  };

  // After Login/Register
  const handleLogin = (role: 'patient' | 'clinician' | 'admin', name: string, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
    setCurrentPage(role === 'patient' ? 'PatientDashboard' : role === 'clinician' ? 'ClinicianDashboard' : 'AdminDashboard');
  };

  const handleRegister = (role: 'patient' | 'clinician', name: string, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
    setCurrentPage(role === 'patient' ? 'PatientDashboard' : 'ClinicianDashboard');
  };

  // Logout → Back to DEMO
  const handleLogout = () => {
    logoutUser(); // Clear tokens from localStorage
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setUserEmail('');
    setViewMode('demo');
    setCurrentPage('Home');
  };

  // 🔐 SECRET ADMIN ACCESS: Press Ctrl+Shift+A anywhere to access admin login
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+A = Admin Login
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setViewMode('app');
        setCurrentPage('AdminLogin');
        console.log('🔐 Admin login activated!');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // DEMO LANDING PAGE
  if (viewMode === 'demo') {
    return (
      <SimplifiedLandingPage 
        onGetStarted={handleDemoGetStarted}
        onLogin={handleDemoLogin}
      />
    );
  }

  // APP MODE - Render Pages
  const renderAppPage = () => {
    // ADMIN LOGIN PAGE (special secret route)
    if (currentPage === 'AdminLogin') {
      return <AdminLoginPage onAdminLogin={() => handleLogin('admin', 'Administrator', 'admin@chemovigi.com')} onNavigate={handleNavigate} />;
    }

    // EMAIL CONFIRMATION PAGE (special case - before and after authentication)
    if (currentPage === 'EmailConfirmation') {
      return <EmailConfirmationPage onNavigate={handleNavigate} onLogin={handleLogin} />;
    }

    // LOGIN/REGISTER PAGES (before authentication)
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'Login':
          return <EnhancedLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
        
        case 'Register':
          return <EnhancedRegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />;
        
        default:
          // Any other page when not logged in → redirect to login
          return <EnhancedLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      }
    }

    // AUTHENTICATED PAGES
    switch (currentPage) {
      case 'PatientDashboard':
        return (
          <PatientDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            userEmail={userEmail}
            reports={reports.filter(r => r.patientEmail === userEmail)}
          />
        );
      
      case 'ClinicianDashboard':
        return (
          <ClinicianDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            reports={reports}
            onUpdateReportStatus={updateReportStatus}
          />
        );
      
      case 'AdminDashboard':
        return (
          <AdminDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
          />
        );
      
      case 'Contact':
        return <ContactPage />;
      
      case 'About':
        return <AboutPage />;
      
      case 'Our Team':
        return <OurTeamPage />;
      
      case 'AI Features':
        return <AIFeaturesPage onOpenChat={handleOpenChat} />;
      
      case 'Drug Info':
        return <DrugStandardizationPage />;
      
      case 'Research':
        return <ResearchKnowledgePage />;
      
      case 'AIHealthcareAutomation':
        return <AIHealthcareAutomationPage onOpenChat={handleOpenChat} />;
      
      case 'PharmaceuticalsOncology':
        return <PharmaceuticalsOncologyPage onOpenChat={handleOpenChat} />;
      
      case 'QuickReporting':
        return (
          <EnhancedQuickReportingPage 
            onNavigate={handleNavigate}
            onReportSubmit={addReport}
            userName={userName}
            userEmail={userEmail}
            onOpenChat={handleOpenChat}
          />
        );
      
      case 'ClinicianReporting':
        return (
          <ClinicianReportForm
            onNavigate={handleNavigate}
            onReportSubmit={addReport}
            userName={userName}
            userEmail={userEmail}
          />
        );
      
      case 'AISeverity':
        return <AISeverityPage />;
      
      case 'SecureAccounts':
        return <SecureAccountsPage />;
      
      case 'DosageCalculator':
        return <DosageCalculatorPage />;
      
      case 'DrugDatabase':
        return <DrugDatabase onOpenChat={handleOpenChat} />;
      
      case 'PatientSettings':
        return <PatientSettings userName={userName} userEmail={userEmail} />;
      
      case 'Home':
      default:
        // Based on role, show appropriate dashboard
        if (userRole === 'patient') {
          return (
            <PatientDashboard 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
              userName={userName}
              userEmail={userEmail}
              reports={reports.filter(r => r.patientEmail === userEmail)}
            />
          );
        } else if (userRole === 'clinician') {
          return (
            <ClinicianDashboard 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
              userName={userName}
              reports={reports}
              onUpdateReportStatus={updateReportStatus}
            />
          );
        } else if (userRole === 'admin') {
          return (
            <AdminDashboard 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
            />
          );
        }
        return (
          <PatientDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            userEmail={userEmail}
            reports={reports.filter(r => r.patientEmail === userEmail)}
          />
        );
    }
  };

  // Show navbar on ALL pages
  const hideNavbar = false; // Always show navbar now

  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      {renderAppPage()}
      
      {/* Hide footer only on dashboards and reporting pages */}
      {currentPage !== 'PatientDashboard' && 
       currentPage !== 'ClinicianDashboard' && 
       currentPage !== 'AdminDashboard' && 
       currentPage !== 'QuickReporting' &&
       currentPage !== 'ClinicianReporting' && (
        <>
          <Footer />
          <AIChatWidget onOpenChat={handleOpenChat} />
        </>
      )}
      
      <FullScreenAIChat isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
}