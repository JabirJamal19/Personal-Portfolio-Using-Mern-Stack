# ⚡ Quick Fix: "Failed to load projects"

## 🎯 5-Minute Fix

Follow these steps in order:

### Step 1: Start MongoDB ✅

```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 2: Check Backend Environment ✅

Create or verify `backend/.env` file exists and has:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=my_secret_key_12345
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_EMAIL=your.email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Step 3: Check Frontend Environment ✅

Create or verify `frontend/.env` file exists and has:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Install & Seed Data ✅

```bash
# Terminal 1 - Backend
cd backend
npm install
node scripts/seedProjects.js
npm run dev
```

**Wait for:** `✅ MongoDB Connected` and `🚀 Server running on port 5000`

### Step 5: Start Frontend ✅

```bash
# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**Wait for:** `Local: http://localhost:3000`

### Step 6: Open Browser ✅

Visit: **http://localhost:3000**

---

## ✅ Verification

Your homepage should now show:
- ⭐ 3 featured projects with star badges
- ✨ Beautiful animations
- 🎨 Professional logo in navbar

---

## 🐛 Still Not Working?

### Quick Checks:

**1. Is backend running?**
Open: `http://localhost:5000/api/health`
Should show: `{"status":"success"}`

**2. Are projects in database?**
Open: `http://localhost:5000/api/projects/featured`
Should show: Array of 3 projects

**3. Check browser console (F12)**
Look for red errors

---

## 🌟 How to Change Featured Projects

Edit `backend/scripts/seedProjects.js` and find:

```javascript
{
  title: 'Your Project Name',
  // ... other fields ...
  featured: true,    // ⭐ Set to true
  order: 1,          // 1 = first, 2 = second, 3 = third
  status: 'completed'
}
```

Then run:
```bash
cd backend
node scripts/seedProjects.js
```

Refresh browser - your projects will update!

---

## 📚 More Help

- **Full Troubleshooting:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Feature Projects Guide:** [HOW_TO_FEATURE_PROJECTS.md](HOW_TO_FEATURE_PROJECTS.md)
- **Complete Setup:** [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 💡 Pro Tips

1. **Always run backend before frontend**
2. **Keep both terminals open while developing**
3. **Check MongoDB is running first**
4. **Clear browser cache if styles look wrong**
5. **Use F12 DevTools Console to debug**

---

**Good luck! Your portfolio should be running now!** 🎉
