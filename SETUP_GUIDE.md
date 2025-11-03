# Setup Guide for Beginners

Step-by-step guide to get your portfolio website running locally.

## 📋 Prerequisites Installation

### 1. Install Node.js

**Windows:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install MongoDB

**Option A: Local Installation**

**Windows:**
1. Download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Run installer
3. Choose "Complete" installation
4. Install as a Service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a cluster (M0 Free tier)
4. Follow setup wizard
5. Get connection string

### 3. Install Git

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win)

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 4. Install VS Code (Optional but Recommended)

Download from [code.visualstudio.com](https://code.visualstudio.com/)

**Recommended Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code

## 🚀 Project Setup

### Step 1: Get the Code

```bash
# Clone the repository
git clone https://github.com/yourusername/mern-portfolio.git

# Navigate to project
cd mern-portfolio
```

### Step 2: Backend Setup

```bash
# Go to backend folder
cd backend

# Install dependencies (this may take a few minutes)
npm install

# Copy environment file
cp .env.example .env

# Open .env in your editor
code .env
# or
notepad .env
```

**Configure `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Choose one:
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Secret (generate random string)
JWT_SECRET=your_secret_key_here

# Email Configuration (for contact form)
# Using Gmail example:
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourportfolio.com
CONTACT_EMAIL=your.email@gmail.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Gmail App Password Setup:**
1. Go to Google Account settings
2. Security → 2-Step Verification (enable it)
3. App passwords → Select app: Mail
4. Generate and copy password
5. Use in `EMAIL_PASS`

### Step 3: Frontend Setup

```bash
# Open new terminal
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file
code .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_NAME=My Portfolio
VITE_SITE_DESCRIPTION=Professional MERN Stack Developer Portfolio
```

### Step 4: Customize Your Portfolio

#### Update Personal Information

Edit `frontend/src/data/profileData.js`:

```javascript
export const profileData = {
  name: "Your Full Name",
  title: "Junior MERN Stack Developer",
  tagline: "Your tagline here",
  bio: "Your bio...",
  
  contact: {
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890",
    location: "Your City, Country",
  },

  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
};

// Update your skills
export const skills = {
  frontend: [
    { name: "React.js", level: 90 },
    // Add your skills...
  ],
  // ...
};

// Update certifications
export const certifications = [
  {
    title: "Your Certification",
    issuer: "Issuer Name",
    date: "2023",
  },
  // Add yours...
];
```

#### Add Your Projects

**Option 1: Using Seed Script**

Edit `backend/scripts/seedProjects.js` with your projects, then:

```bash
cd backend
node scripts/seedProjects.js
```

**Option 2: Add via API (after starting servers)**

Use Postman or create admin account and use the admin panel.

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE ready in xxx ms
Local: http://localhost:3000
```

### Step 6: Open in Browser

Visit: `http://localhost:3000`

## ✅ Verification

Check if everything works:

1. **Homepage loads** ✓
2. **Navigation works** ✓
3. **Projects section shows** ✓
4. **Contact form submits** ✓
5. **No console errors** ✓

## 🐛 Common Issues & Solutions

### Issue: "npm: command not found"
**Solution:** Install Node.js properly and restart terminal

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check if MongoDB is running: `mongod --version`
- Start MongoDB service
- Or use MongoDB Atlas connection string

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in backend `.env`
- Or kill process: `npx kill-port 5000`

### Issue: "Module not found"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error"
**Solution:**
- Verify FRONTEND_URL in backend `.env`
- Check VITE_API_URL in frontend `.env`

### Issue: "Email not sending"
**Solution:**
- Verify Gmail app password
- Check spam folder
- Try test email service like Mailtrap

## 📚 Next Steps

1. **Customize Design**
   - Update colors in `tailwind.config.js`
   - Change fonts in `index.html`

2. **Add Content**
   - Add your projects
   - Write blog posts
   - Update images

3. **Test Everything**
   - Test on mobile devices
   - Try different browsers
   - Check all forms

4. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Set up production environment

## 💡 Tips

- **Use Dev Tools:** Open browser console (F12) to debug
- **Save Often:** Changes auto-reload in dev mode
- **Read Errors:** Error messages usually tell you what's wrong
- **Check Logs:** Look at terminal output for backend errors
- **Use Git:** Commit changes frequently

## 🆘 Getting Help

If you're stuck:

1. Check error messages carefully
2. Search the error on Google
3. Check existing GitHub issues
4. Ask in the Discussions section
5. Read the documentation

## 📞 Resources

- [React Docs](https://react.dev)
- [Node.js Docs](https://nodejs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Express Docs](https://expressjs.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

**Congratulations!** Your portfolio is now running locally! 🎉

Continue with `DEPLOYMENT.md` when ready to deploy to production.
