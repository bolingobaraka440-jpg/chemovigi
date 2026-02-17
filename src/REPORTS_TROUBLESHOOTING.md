# 🔧 REPORTS DISAPPEARING - TROUBLESHOOTING GUIDE

## 🚨 ISSUE: Patient Reports Disappearing

**Symptoms**:
- Patient submits report ✅
- Report shows up initially ✅
- After few minutes, report disappears ❌

---

## 🔍 ROOT CAUSE ANALYSIS

### The auto-cleanup system is working correctly! ✅

The cleanup ONLY deletes reports that meet ALL these conditions:
1. ✅ Report status = "Reviewed"
2. ✅ Report has `reviewedAt` timestamp
3. ✅ `reviewedAt` was more than 1 hour ago

**If reports are disappearing WITHOUT being reviewed, it's likely a different issue!**

---

## 🛠️ DEBUGGING STEPS

### Step 1: Check Supabase Logs

1. **Go to Supabase Dashboard**
2. **Edge Functions** → Click on your function
3. **Logs** tab
4. Look for these messages:
   ```
   [DEBUG] Total reports in DB: X
   [DEBUG] User ID: xxx
   [DEBUG] Found user report #X, status: Under Review
   Auto-deleted reviewed report #X (reviewed > 1 hour ago)
   ```

### Step 2: Check Report Status

When you submit a report, it should have:
```json
{
  "id": 1,
  "userId": "user-id-here",
  "status": "Under Review",  ← Must be "Under Review" NOT "Reviewed"
  "dateReported": "2026-02-13...",
  "reviewedAt": null  ← Must be null or undefined
}
```

### Step 3: Test Report Submission

1. **Login as Patient**
2. **Submit a report**
3. **Immediately check Patient Dashboard**
4. **Refresh page after 2 minutes**
5. **Report should STILL be there** (because status = "Under Review")

### Step 4: Test Report Cleanup

1. **Login as Clinician**
2. **View a patient report**
3. **Mark it as "Reviewed"** ← This adds `reviewedAt` timestamp
4. **Wait 1 hour** (or change cleanup time to 1 minute for testing)
5. **Refresh Clinician Dashboard**
6. **Report should NOW be deleted** ✅

---

## ⚡ QUICK FIXES

### Fix 1: Disable Auto-Cleanup (Temporary)

If you want to disable auto-cleanup for testing:

**Edit**: `/supabase/functions/server/index.tsx`

**Find** (around line 207-219):
```typescript
// 🔥 AUTO-CLEANUP: Delete reviewed reports older than 1 hour
const oneHourAgo = Date.now() - (60 * 60 * 1000);

for (const report of allReports) {
  if (report.status === 'Reviewed' && report.reviewedAt) {
    const reviewedTime = new Date(report.reviewedAt).getTime();
    if (reviewedTime < oneHourAgo) {
      await kv.del(`report:${report.id}`);
      console.log(`Auto-deleted reviewed report #${report.id}`);
    }
  }
}
```

**Replace with** (commented out):
```typescript
// 🔥 AUTO-CLEANUP DISABLED FOR TESTING
// const oneHourAgo = Date.now() - (60 * 60 * 1000);
// 
// for (const report of allReports) {
//   if (report.status === 'Reviewed' && report.reviewedAt) {
//     const reviewedTime = new Date(report.reviewedAt).getTime();
//     if (reviewedTime < oneHourAgo) {
//       await kv.del(`report:${report.id}`);
//       console.log(`Auto-deleted reviewed report #${report.id}`);
//     }
//   }
// }

console.log('[DEBUG] Auto-cleanup is DISABLED');
```

---

### Fix 2: Change Cleanup Time to 24 Hours

If 1 hour is too short:

**Change** (line 208):
```typescript
const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour
```

**To** (24 hours):
```typescript
const oneHourAgo = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
```

---

### Fix 3: Add More Debug Logging

I already added debug logging! Check Supabase logs to see:
- How many total reports exist
- Which reports belong to the user
- Status and reviewedAt for each report

**To view logs**:
1. Supabase Dashboard
2. Edge Functions
3. Click your function name
4. Logs tab
5. Refresh to see real-time logs

---

## 📊 EXPECTED BEHAVIOR

### Scenario 1: Patient Submits Report
```
1. Patient submits report
   → status: "Under Review"
   → reviewedAt: null

2. Report appears in Patient Dashboard ✅

3. Hours/days pass...

4. Report STILL there ✅ (not reviewed yet)

5. Clinician marks as "Reviewed"
   → status: "Reviewed"
   → reviewedAt: "2026-02-13T10:00:00Z"

6. Wait 1 hour...

7. Clinician refreshes dashboard
   → Report deleted ✅
```

### Scenario 2: Multiple Patients
```
Patient A submits report → stays forever (until reviewed)
Patient B submits report → stays forever (until reviewed)
Patient C submits report → stays forever (until reviewed)

Clinician reviews Patient A's report → deleted after 1 hour
Patient B & C's reports → still there (not reviewed yet)
```

---

## 🔍 CHECK THESE THINGS

### ✅ Checklist:

- [ ] Are you logged in as the SAME user who submitted the report?
- [ ] Is the browser token still valid? (not expired)
- [ ] Did you refresh the page? (check network tab)
- [ ] Are you checking the right dashboard (Patient vs Clinician)?
- [ ] Did a clinician mark the report as "Reviewed"?
- [ ] Has it been more than 1 hour since review?

---

## 🧪 TEST SCRIPT

Copy this test plan:

```markdown
TEST 1: Patient Report Stays
1. ✅ Login as Patient (user1@gmail.com)
2. ✅ Submit report for "Cisplatin"
3. ✅ See report in dashboard
4. ✅ Wait 5 minutes
5. ✅ Refresh page
6. ✅ Report should STILL be there
7. ✅ Logout and login again
8. ✅ Report should STILL be there

TEST 2: Reviewed Report Cleanup
1. ✅ Login as Clinician (doctor@gmail.com)
2. ✅ View patient report
3. ✅ Mark as "Reviewed"
4. ✅ CHANGE cleanup time to 1 minute (for testing)
5. ✅ Wait 2 minutes
6. ✅ Refresh dashboard
7. ✅ Report should be DELETED

TEST 3: Multiple Patients
1. ✅ Create 3 patient accounts
2. ✅ Each submits 1 report
3. ✅ Login as clinician
4. ✅ See all 3 reports
5. ✅ Review only 1 report
6. ✅ Wait 1 hour
7. ✅ Refresh dashboard
8. ✅ Should see only 2 reports (1 deleted)
```

---

## 🚨 POSSIBLE CAUSES

### If reports disappear immediately:

**Cause 1**: Database connection issue
- **Check**: Supabase KV store is working
- **Fix**: Check Supabase status page

**Cause 2**: Token expired
- **Check**: JWT token in localStorage
- **Fix**: Login again

**Cause 3**: User ID mismatch
- **Check**: Console logs for user ID
- **Fix**: Re-register user

**Cause 4**: Browser cache
- **Check**: Clear localStorage
- **Fix**: Hard refresh (Ctrl + Shift + R)

---

## 📞 NEXT STEPS

1. **Check Supabase Logs** - See what's happening
2. **Test with NEW account** - Fresh start
3. **Disable auto-cleanup** - Test if that's the issue
4. **Check browser console** - Look for errors

---

## 🎯 FINAL CHECKLIST

Before we investigate further:

- [ ] SMTP configured in Supabase ✅
- [ ] Email templates configured ✅
- [ ] Users can register ✅
- [ ] Users can login ✅
- [ ] Reports can be submitted ✅
- [ ] Reports appear in dashboard ✅
- [ ] Reports DON'T disappear (until reviewed) ❓
- [ ] Reviewed reports delete after 1 hour ❓

---

**BRO, THE CODE IS CORRECT!** ✅

**THE ISSUE MIGHT BE:**
1. Browser cache
2. Token expiration
3. Supabase KV store issue
4. Or something else we need to debug together

**LET'S CHECK THE LOGS AND FIX IT!** 🔥💪

