# ChemoVigi Backend Integration Guide

## 🎉 Your Frontend is Now Connected to Your Backend!

### What Changed?

Your ChemoVigi frontend now **connects to your real backend API** instead of using mock data. When users register or login, the data is sent to your MongoDB database!

---

## 📋 Setup Instructions

### 1. **Start Your Backend Server**
Make sure your ChemoVigi backend is running on port 5000:
```bash
cd chemovigi-backend
npm start
# Should show: Server running on http://localhost:5000
```

### 2. **Start Your Frontend**
In a separate terminal, run your frontend:
```bash
cd chemovigi-frontend
npm start
# Should open: http://localhost:3000
```

### 3. **Make Sure MongoDB Compass is Running**
- Open MongoDB Compass
- Connect to your local MongoDB instance
- Your database will automatically populate when users register/login

---

## 🔐 How Authentication Works Now

### **Registration Flow**
1. User fills out registration form
2. Frontend sends POST request to `http://localhost:5000/api/auth/register`
3. Backend saves user to MongoDB
4. Frontend automatically logs the user in
5. JWT token is stored in browser's localStorage
6. User is redirected to their dashboard

### **Login Flow**
1. User enters email and password
2. Frontend sends POST request to `http://localhost:5000/api/auth/login`
3. Backend validates credentials against MongoDB
4. If valid, backend returns JWT token + user data
5. Token is stored in localStorage
6. User is redirected to dashboard

### **Logout Flow**
1. User clicks logout
2. JWT token is removed from localStorage
3. User is redirected to landing page

---

## 📁 New Files Created

### `/services/api.ts`
This file handles all communication with your backend:
- `registerUser()` - Registers new patients/clinicians
- `loginUser()` - Authenticates users
- `logoutUser()` - Clears authentication tokens
- `getCurrentUser()` - Gets logged-in user info
- `getAuthToken()` - Retrieves JWT token

---

## ✅ Test It Out!

### Test Registration:
1. Go to http://localhost:3000
2. Click "Get Started" or "Sign In"
3. Choose "Patient" or "Clinician"
4. Fill out the form:
   - **Patient Example:**
     - Name: John Doe
     - Email: john@example.com
     - Password: 123456
   
   - **Clinician Example:**
     - Name: Dr. Sarah Smith
     - Email: sarah@example.com
     - Password: 123456
     - License: MD12345
     - Specialty: Oncology

5. Click "Create Account"
6. ✅ You should be logged in and see your dashboard!
7. ✅ Check MongoDB Compass - you should see the new user!

### Test Login:
1. Logout from your account
2. Click "Sign In"
3. Enter the email and password you registered with
4. ✅ You should be logged back in!

---

## 🔍 Debugging Tips

### If you see "Failed to connect to server":
- ✅ Make sure backend is running on port 5000
- ✅ Check backend console for errors
- ✅ Verify MongoDB Compass is connected

### If registration fails:
- ✅ Check if email is already registered (try a different email)
- ✅ Make sure password is at least 6 characters
- ✅ For clinicians, ensure license number and specialty are filled

### If login fails:
- ✅ Make sure you registered first with that email
- ✅ Check if password is correct
- ✅ Make sure you selected the correct role (patient/clinician)

### To check if it's working:
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Try logging in - you should see:
   ```
   Login successful: {token: "...", user: {...}}
   ```
4. Go to "Application" → "Local Storage" → check for "authToken"

---

## 🚀 What's Next?

Now that authentication is working, you can:

1. **Connect Report Submission** - Make patient/clinician reports save to database
2. **Fetch Reports from Database** - Display real reports from MongoDB
3. **Add Protected Routes** - Use JWT tokens to secure API endpoints
4. **Add Profile Updates** - Let users update their information
5. **Add Password Reset** - Implement forgot password functionality

---

## 🛠️ API Configuration

If your backend runs on a different port, update `/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:YOUR_PORT';
```

---

## 📞 Need Help?

If something's not working:
1. Check both frontend and backend console logs
2. Verify MongoDB is running and connected
3. Make sure both servers are on the correct ports
4. Try registering with a fresh email address

---

**You're all set, bro! 🚀 Now your frontend and backend are working together like a pro! 💪**
