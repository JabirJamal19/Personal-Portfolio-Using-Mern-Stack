# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 📦 What You Need

- Node.js 16+ installed
- MongoDB (local or Atlas account)
- Gmail account (for contact form)

## 🚀 Quick Setup

### 1️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd frontend
npm install
```

### 2️⃣ Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=my_super_secret_key_12345
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
CONTACT_EMAIL=your.email@gmail.com
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3️⃣ Add Sample Data

```bash
cd backend
node scripts/seedProjects.js
```

### 4️⃣ Start Servers

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

### 5️⃣ Open Browser

Visit: **http://localhost:3000**

## 🎨 Customize

1. **Personal Info:** Edit `frontend/src/data/profileData.js`
2. **Colors:** Edit `frontend/tailwind.config.js`
3. **Projects:** Use seed script or add via API

## 📝 Next Steps

- Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Check [DEPLOYMENT.md](DEPLOYMENT.md) when ready to deploy
- Customize your content and styling

## 🐛 Issues?

- MongoDB not connecting? Make sure it's running or use Atlas
- Port in use? Change PORT in `.env`
- Email not working? Check Gmail app password setup

## 🎉 That's It!

Your portfolio is running! Now make it yours.

---

**Need detailed help?** See [SETUP_GUIDE.md](SETUP_GUIDE.md)
