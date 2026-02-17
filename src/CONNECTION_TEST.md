# 🔌 Backend Connection Test

## Quick Test to Verify Backend is Running

Open your browser console (F12) and paste this code:

```javascript
// Test if backend is reachable
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test', role: 'patient' })
})
.then(res => res.json())
.then(data => console.log('✅ Backend is running!', data))
.catch(err => console.error('❌ Backend is NOT running:', err));
```

### Expected Results:

**✅ If backend IS running:**
```
✅ Backend is running! 
{msg: "Invalid credentials"} or {error: "User not found"}
```
(This error is GOOD - it means backend responded!)

**❌ If backend is NOT running:**
```
❌ Backend is NOT running: 
Failed to fetch or Network error
```

---

## Common Issues & Solutions

### Issue 1: "Failed to fetch"
**Solution:** Start your backend server
```bash
cd chemovigi-backend
npm start
```

### Issue 2: "CORS error"
**Solution:** Your backend needs CORS enabled. Check your backend has:
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue 3: "Port already in use"
**Solution:** Kill the process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## Database Connection Test

In MongoDB Compass:
1. Click "Connect" 
2. Use connection string: `mongodb://localhost:27017`
3. Look for your database (usually `chemovigi` or similar)
4. You should see collections: `users`, `patients`, `clinicians`

---

## Full System Check

✅ **Step 1:** MongoDB Compass connected
✅ **Step 2:** Backend running on http://localhost:5000
✅ **Step 3:** Frontend running on http://localhost:3000
✅ **Step 4:** Try registering a test user
✅ **Step 5:** Check MongoDB Compass for new user entry

**If all steps pass - YOU'RE READY TO GO! 🚀**
