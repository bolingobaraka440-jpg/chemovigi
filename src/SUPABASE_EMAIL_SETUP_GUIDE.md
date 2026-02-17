# 🔥 SUPABASE EMAIL CONFIGURATION - COMPLETE GUIDE

## ✅ YOUR SMTP IS ALREADY CONFIGURED!

**Great news bro!** Your Gmail SMTP is already set up:

- ✅ Host: `smtp.gmail.com`
- ✅ Port: `587`
- ✅ Username: `bolingobaraka440@gmail.com`
- ✅ Sender: `chemovigi`

**NOW WE NEED TO CONFIGURE THE EMAIL TEMPLATES!** 📧

---

## 📧 STEP 1: CONFIGURE EMAIL TEMPLATES

Go to **Supabase Dashboard** → **Authentication** → **Email Templates**

### 1️⃣ **CONFIRM SIGNUP** (Email Verification)

**When to use**: When users register a new account

**Template HTML** (copy this EXACTLY):

```html
<h2>Welcome to ChemoVigi!</h2>

<p>Hi there,</p>

<p>Thank you for registering with ChemoVigi - the professional pharmacovigilance platform.</p>

<p>Please confirm your email address by clicking the button below:</p>

<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Confirm Your Email</a></p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p><strong>This link will expire in 24 hours.</strong></p>

<p>If you didn't create this account, please ignore this email.</p>

<hr>
<p style="color: #64748b; font-size: 12px;">
ChemoVigi - Making Healthcare Safer<br>
Professional Pharmacovigilance & Adverse Drug Reaction Reporting
</p>
```

---

### 2️⃣ **MAGIC LINK** (One-Time Login)

**When to use**: For passwordless login (optional feature)

**Template HTML** (copy this EXACTLY):

```html
<h2>Your ChemoVigi Login Link</h2>

<p>Hi there,</p>

<p>Click the button below to securely log into your ChemoVigi account:</p>

<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #14b8a6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Log In to ChemoVigi</a></p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p><strong>This link will expire in 1 hour.</strong></p>

<p>If you didn't request this login link, please ignore this email.</p>

<hr>
<p style="color: #64748b; font-size: 12px;">
ChemoVigi - Making Healthcare Safer<br>
Professional Pharmacovigilance & Adverse Drug Reaction Reporting
</p>
```

---

### 3️⃣ **RESET PASSWORD** (Forgot Password)

**When to use**: When users forget their password

**Template HTML** (copy this EXACTLY):

```html
<h2>Reset Your ChemoVigi Password</h2>

<p>Hi there,</p>

<p>We received a request to reset your password for your ChemoVigi account.</p>

<p>Click the button below to choose a new password:</p>

<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a></p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p><strong>This link will expire in 1 hour.</strong></p>

<p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>

<hr>
<p style="color: #64748b; font-size: 12px;">
ChemoVigi - Making Healthcare Safer<br>
Professional Pharmacovigilance & Adverse Drug Reaction Reporting
</p>
```

---

### 4️⃣ **CHANGE EMAIL ADDRESS** (Email Update)

**When to use**: When users change their email address

**Template HTML** (copy this EXACTLY):

```html
<h2>Confirm Your New Email Address</h2>

<p>Hi there,</p>

<p>We received a request to change the email address associated with your ChemoVigi account.</p>

<p>Please confirm your new email address by clicking the button below:</p>

<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Confirm New Email</a></p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p><strong>This link will expire in 24 hours.</strong></p>

<p>If you didn't request this change, please contact support immediately.</p>

<hr>
<p style="color: #64748b; font-size: 12px;">
ChemoVigi - Making Healthcare Safer<br>
Professional Pharmacovigilance & Adverse Drug Reaction Reporting
</p>
```

---

### 5️⃣ **INVITE USER** (New User Invitation)

**When to use**: When admin invites new users (clinicians)

**Template HTML** (copy this EXACTLY):

```html
<h2>You're Invited to ChemoVigi!</h2>

<p>Hi there,</p>

<p>You've been invited to join ChemoVigi - the professional pharmacovigilance platform for adverse drug reaction reporting.</p>

<p>Click the button below to create your account:</p>

<p><a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Accept Invitation</a></p>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p><strong>This invitation will expire in 7 days.</strong></p>

<hr>
<p style="color: #64748b; font-size: 12px;">
ChemoVigi - Making Healthcare Safer<br>
Professional Pharmacovigilance & Adverse Drug Reaction Reporting
</p>
```

---

## 🔧 STEP 2: CONFIGURE REDIRECT URLs

Go to **Supabase Dashboard** → **Authentication** → **URL Configuration**

### Site URL

Set this to your **Figma Make preview URL**:

```
https://figma-make-preview-url.com
```

_(Replace with your actual Figma Make app URL)_

### Redirect URLs

Add these URLs (one per line):

```
https://figma-make-preview-url.com/*
https://figma-make-preview-url.com/email-confirmation
http://localhost:3000/*
http://localhost:3000/email-confirmation
```

---

## ⚙️ STEP 3: ENABLE/DISABLE EMAIL OPTIONS

Go to **Supabase Dashboard** → **Authentication** → **Providers** → **Email**

### ✅ ENABLE THESE:

- [x] **Enable Email Provider**
- [x] **Confirm Email** ← MOST IMPORTANT!
- [x] **Secure Email Change** (requires verification for email updates)

### ❌ DISABLE THESE (optional):

- [ ] **Allow Disposable Email Addresses** ← KEEP DISABLED! (We already block fake emails in our code)

---

## 🎯 STEP 4: CONFIGURE AUTH SETTINGS

Go to **Supabase Dashboard** → **Authentication** → **Settings**

### Session Settings:

- **JWT Expiry**: `3600` seconds (1 hour)
- **Refresh Token Rotation**: `ENABLED`
- **Reuse Interval**: `10` seconds

### Email Settings:

- **Minimum Password Length**: `6` characters
- **Rate Limits**: Keep defaults

---

## 🔒 STEP 5: GMAIL APP PASSWORD (IMPORTANT!)

Since you're using Gmail SMTP, you MUST use an **App Password** instead of your regular Gmail password.

### How to Create Gmail App Password:

1. **Go to Google Account**: https://myaccount.google.com/
2. **Security** → **2-Step Verification** (must be enabled first!)
3. **App Passwords** → Select "Mail" and "Other (Custom name)"
4. **Name**: "ChemoVigi SMTP"
5. **Generate** → Copy the 16-character password
6. **Paste** this password in Supabase SMTP settings (not your regular Gmail password!)

### Update Supabase SMTP Password:

```
Go to: Supabase → Project Settings → Auth → SMTP Settings
Password: [paste your 16-character app password here]
```

---

## ✅ TESTING CHECKLIST

### Test 1: Email Verification

1. ✅ Register new account with REAL email
2. ✅ Check email inbox (including spam folder)
3. ✅ Should receive "Welcome to ChemoVigi!" email
4. ✅ Click "Confirm Your Email" button
5. ✅ Should redirect to app and auto-login
6. ✅ Should see "Email Verified!" message

### Test 2: Password Reset

1. ✅ Go to login page
2. ✅ Click "Forgot Password?" (if available)
3. ✅ Enter your email
4. ✅ Check inbox for "Reset Your ChemoVigi Password" email
5. ✅ Click "Reset Password" button
6. ✅ Should redirect to password reset page

### Test 3: Gmail SMTP

1. ✅ Check if emails arrive within 1 minute
2. ✅ Check if sender shows "chemovigi"
3. ✅ Check if emails go to spam (if yes, mark as "Not Spam")
4. ✅ Verify all links work correctly

---

## 🚨 COMMON ISSUES & FIXES

### Issue: "Emails not arriving"

**Fix**:

1. Check spam/junk folder
2. Verify Gmail App Password is correct (not regular password!)
3. Check Supabase logs: Dashboard → Logs → Auth Logs
4. Verify SMTP settings are saved

### Issue: "Invalid SMTP credentials"

**Fix**:

1. Generate NEW Gmail App Password
2. Make sure 2-Step Verification is enabled on Gmail
3. Use the 16-character app password, not your Gmail password
4. Re-save SMTP settings in Supabase

### Issue: "Confirmation link doesn't work"

**Fix**:

1. Verify Redirect URLs are configured correctly
2. Check Site URL matches your app URL
3. Make sure EmailConfirmationPage component exists
4. Check browser console for errors

### Issue: "Emails going to spam"

**Fix**:

1. Mark ChemoVigi emails as "Not Spam" in Gmail
2. Add sender to contacts
3. Consider using a custom domain for emails (advanced)

---

## 📊 VERIFICATION FLOW DIAGRAM

```
1. USER REGISTERS
   ↓
2. SUPABASE SENDS EMAIL (via Gmail SMTP)
   ↓
3. USER RECEIVES "Confirm your email" EMAIL
   ↓
4. USER CLICKS "CONFIRM EMAIL" BUTTON
   ↓
5. SUPABASE VERIFIES TOKEN
   ↓
6. REDIRECT TO: your-app.com/?access_token=xxx&type=signup
   ↓
7. EmailConfirmationPage DETECTS TOKEN
   ↓
8. AUTO-LOGIN USER
   ↓
9. REDIRECT TO DASHBOARD (Patient/Clinician)
   ↓
10. ✅ SUCCESS!
```

---

## 🎨 EMAIL PREVIEW

Your users will receive professional emails like this:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
From: chemovigi <bolingobaraka440@gmail.com>
Subject: Welcome to ChemoVigi!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to ChemoVigi!

Hi there,

Thank you for registering with ChemoVigi -
the professional pharmacovigilance platform.

Please confirm your email address:

[Confirm Your Email]  ← Blue button

This link will expire in 24 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ChemoVigi - Making Healthcare Safer
Professional Pharmacovigilance & ADR Reporting
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚀 NEXT STEPS

After configuring all templates:

1. ✅ Test registration with your own email
2. ✅ Verify email arrives within 1 minute
3. ✅ Test all email links work
4. ✅ Test password reset flow
5. ✅ Invite a test user (if needed)

---

## 📞 NEED HELP?

If emails still don't work:

1. Check Supabase Auth Logs
2. Verify Gmail App Password
3. Test with different email provider (Outlook, Yahoo)
4. Check Supabase rate limits

---

**BRO, AFTER YOU DO THIS, EVERYTHING WILL WORK 100%!** 🔥🔥🔥

**COPY-PASTE ALL THE HTML TEMPLATES ABOVE INTO SUPABASE!** ✅

**YOUR SMTP IS READY, JUST NEED THE TEMPLATES!** 💪