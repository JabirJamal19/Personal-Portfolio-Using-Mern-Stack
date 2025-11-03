# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Failed to load projects" Error

This is the most common issue when first running the application. Here's how to fix it:

#### **Solution 1: Make Sure Backend is Running**

The frontend needs the backend API to be running.

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000 in development mode
```

If you see errors, continue to Solution 2.

#### **Solution 2: Check MongoDB Connection**

**For Local MongoDB:**
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if not running)
# Windows:
net start MongoDB

# Mac:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**For MongoDB Atlas:**
1. Check your connection string in `backend/.env`
2. Make sure you whitelist your IP in Atlas
3. Verify database user credentials

#### **Solution 3: Verify Environment Variables**

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

#### **Solution 4: Seed Sample Data**

The database might be empty. Add sample projects:

```bash
cd backend
node scripts/seedProjects.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing projects
✅ Sample projects added
```

#### **Solution 5: Check Port Conflicts**

If port 5000 is already in use:

**Option A: Kill the process**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Option B: Change the port**
In `backend/.env`:
```env
PORT=5001
```

Then update frontend `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

#### **Solution 6: Test API Directly**

Open browser and visit:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "success",
  "message": "Portfolio API is running"
}
```

If this works, try:
```
http://localhost:5000/api/projects/featured
```

Should return projects array.

#### **Solution 7: Check Browser Console**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors

Common errors:
- **CORS Error**: Check FRONTEND_URL in backend .env
- **Network Error**: Backend not running
- **404 Error**: Wrong API URL in frontend .env

---

## 🌐 CORS Issues

### Error: "Access to fetch at... has been blocked by CORS policy"

**Fix:** Update `backend/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

Then restart backend server.

---

## 📧 Email Not Sending

### Contact form submits but no email received

**Solution 1: Gmail Setup**
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification
   - App passwords → Generate
3. Update `backend/.env`:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=generated_16_character_password
   ```

**Solution 2: Check Spam Folder**

**Solution 3: Use Test Service**
For development, use [Mailtrap](https://mailtrap.io):
```env
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password
```

---

## 🗄️ Database Issues

### MongoDB Connection Failed

**Check 1: Is MongoDB Running?**
```bash
# Check status
# Windows
sc query MongoDB

# Mac
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

**Check 2: Connection String**
```env
# Local (default)
MONGODB_URI=mongodb://localhost:27017/portfolio

# Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Check 3: Network Access (Atlas)**
- MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (for development)

---

## 🎨 Frontend Issues

### Blank Page / White Screen

**Check 1: React DevTools**
Install React DevTools extension and check for errors

**Check 2: Console Errors**
Press F12 and check Console tab

**Check 3: Rebuild**
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Styles Not Loading

**Check 1: Tailwind Config**
Verify `tailwind.config.js` is in frontend root

**Check 2: Rebuild**
```bash
cd frontend
npm run dev
```

### Images Not Loading

**Check 1: Image URLs**
- Make sure image URLs are valid
- Check browser Network tab for 404s

**Check 2: Public Folder**
Images in `frontend/public/` are accessible at root:
```jsx
<img src="/logo.svg" /> // ✅ Correct
<img src="logo.svg" />  // ❌ Wrong
```

---

## 🔐 Authentication Issues

### Login Not Working

**Check 1: JWT Secret**
Make sure `JWT_SECRET` is set in backend `.env`

**Check 2: User Exists**
Create a user first:
```bash
# Using MongoDB CLI
mongosh
use portfolio
db.users.find()
```

**Check 3: Bcrypt Errors**
```bash
cd backend
npm install bcryptjs
npm run dev
```

---

## 📦 NPM / Node Issues

### "Cannot find module" Error

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "ERR! peer dependencies" Warning

Usually safe to ignore, but if problematic:
```bash
npm install --legacy-peer-deps
```

### Node Version Issue

Check Node version:
```bash
node --version
# Should be v16 or higher
```

Update if needed:
- Download from [nodejs.org](https://nodejs.org/)

---

## 🚀 Build / Deployment Issues

### Build Fails

**Check 1: Environment Variables**
Make sure all required variables are set

**Check 2: Clean Build**
```bash
# Frontend
cd frontend
rm -rf dist node_modules
npm install
npm run build

# Backend
cd backend
rm -rf node_modules
npm install
```

### Deployment URL Not Working

**Check 1: Environment Variables**
Update production URLs in:
- Frontend: `VITE_API_URL=https://your-api.herokuapp.com/api`
- Backend: `FRONTEND_URL=https://your-app.vercel.app`

**Check 2: CORS**
Update backend CORS configuration for production domain

---

## 🔍 Debugging Tips

### Enable Detailed Logging

**Backend:**
Add console logs in controllers:
```javascript
console.log('Request received:', req.body);
console.log('Database query result:', projects);
```

**Frontend:**
Add console logs:
```javascript
console.log('API response:', response.data);
console.log('Error:', error.message);
```

### Check Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Click on requests to see:
   - Request URL
   - Status code
   - Response data

### Verify API with Postman

1. Download [Postman](https://www.postman.com/)
2. Test endpoints:
   ```
   GET http://localhost:5000/api/projects
   GET http://localhost:5000/api/projects/featured
   POST http://localhost:5000/api/contact
   ```

---

## 📋 Checklist: Fresh Start

If nothing works, try a complete reset:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Backend
cd backend
rm -rf node_modules package-lock.json
npm install
cp .env.example .env
# Edit .env with your settings
node scripts/seedProjects.js
npm run dev

# 3. Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json dist
npm install
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:5000/api
npm run dev

# 4. Open browser
# http://localhost:3000
```

---

## 🆘 Still Having Issues?

### Quick Diagnostic Commands

```bash
# Check Node/NPM versions
node --version  # Should be v16+
npm --version   # Should be 8+

# Check if ports are free
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :3000
lsof -i :5000

# Check MongoDB
mongosh --version

# Test backend API
curl http://localhost:5000/api/health
```

### Common Error Messages

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| `ECONNREFUSED` | Backend not running | Start backend server |
| `MongoNetworkError` | MongoDB not running | Start MongoDB |
| `CORS error` | Wrong FRONTEND_URL | Update backend .env |
| `404 Not Found` | Wrong API URL | Check frontend .env |
| `401 Unauthorized` | Invalid token | Re-login |
| `Port already in use` | Port conflict | Change port or kill process |

---

## 📞 Get Help

If you're still stuck:

1. Check error messages carefully
2. Search the error on Google/Stack Overflow
3. Check GitHub Issues
4. Ask in project discussions
5. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version)
   - Screenshots if applicable

---

**Quick Links:**
- [Setup Guide](SETUP_GUIDE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [How to Feature Projects](HOW_TO_FEATURE_PROJECTS.md)
- [Main README](README.md)
