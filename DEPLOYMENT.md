# Deployment Guide

Complete guide for deploying your MERN stack portfolio website to production.

## 📋 Pre-Deployment Checklist

### Backend
- [ ] Update all environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas
- [ ] Set up email service
- [ ] Generate strong JWT secret
- [ ] Test all API endpoints
- [ ] Enable CORS for production URL

### Frontend
- [ ] Update API URL to production
- [ ] Update personal information in `profileData.js`
- [ ] Add your projects and content
- [ ] Test responsive design
- [ ] Optimize images
- [ ] Update meta tags and SEO
- [ ] Test all routes

### Database
- [ ] Create MongoDB Atlas cluster
- [ ] Whitelist IP addresses
- [ ] Create database user
- [ ] Seed initial data

## 🚀 MongoDB Atlas Setup

### 1. Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Build a cluster (Free M0 tier available)
5. Choose a cloud provider and region

### 2. Database Access

1. Go to Database Access
2. Add a new database user
3. Set username and password
4. Grant read/write permissions

### 3. Network Access

1. Go to Network Access
2. Add IP Address
3. For development: Add `0.0.0.0/0` (Allow access from anywhere)
4. For production: Add your server's IP

### 4. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## 🔧 Backend Deployment

### Option 1: Heroku

#### Setup
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-portfolio-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_strong_secret_key"
heroku config:set EMAIL_HOST="smtp.gmail.com"
heroku config:set EMAIL_PORT=587
heroku config:set EMAIL_USER="your_email@gmail.com"
heroku config:set EMAIL_PASS="your_app_password"
heroku config:set CONTACT_EMAIL="your_contact@email.com"
heroku config:set FRONTEND_URL="https://your-frontend-url.vercel.app"
```

#### Deploy
```bash
# From project root
git subtree push --prefix backend heroku main

# Or from backend directory
cd backend
git init
heroku git:remote -a your-portfolio-api
git add .
git commit -m "Initial deployment"
git push heroku main
```

#### View Logs
```bash
heroku logs --tail -a your-portfolio-api
```

### Option 2: Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Add "New Service" → "GitHub Repo"
5. Select your repository
6. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Add environment variables in Variables tab
8. Deploy

### Option 3: Render

1. Go to [Render](https://render.com)
2. Sign up and create new Web Service
3. Connect your GitHub repository
4. Configure:
   - Environment: Node
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Create Web Service

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Using CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Deploy to production
vercel --prod
```

#### Using GitHub Integration

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-api-url.herokuapp.com/api
   ```
6. Deploy

### Option 2: Netlify

#### Using CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### Using GitHub Integration

1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
6. Add environment variables
7. Deploy

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.js:
base: '/your-repo-name/'

# Deploy
npm run deploy
```

## 📧 Email Service Setup

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Google Account → Security → 2-Step Verification
   - App passwords → Select app: Mail
   - Generate and copy password
3. Use in environment variables:
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=generated_app_password
   ```

### Alternative: SendGrid

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API key
3. Update email configuration in backend
4. Use SendGrid SMTP or API

## 🔒 Security Considerations

### 1. Environment Variables

Never commit `.env` files. Always use:
- Heroku Config Vars
- Vercel Environment Variables
- Railway Variables
- Render Environment Variables

### 2. CORS Configuration

Update allowed origins in `backend/server.js`:
```javascript
cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
})
```

### 3. JWT Secret

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Rate Limiting

Adjust rate limits for production in `backend/server.js`.

## 🔍 Testing Production

### Backend API
```bash
# Test health endpoint
curl https://your-api.herokuapp.com/api/health

# Test projects endpoint
curl https://your-api.herokuapp.com/api/projects
```

### Frontend
1. Test all navigation links
2. Verify API calls work
3. Test contact form submission
4. Check responsive design
5. Test on multiple browsers

## 📊 Monitoring

### Backend Logs

**Heroku:**
```bash
heroku logs --tail
```

**Railway:**
- Check Deployments tab in dashboard

**Render:**
- View logs in service dashboard

### Performance Monitoring

Consider adding:
- [New Relic](https://newrelic.com)
- [Datadog](https://www.datadoghq.com)
- [Sentry](https://sentry.io) for error tracking

### Database Monitoring

- Use MongoDB Atlas monitoring dashboard
- Set up alerts for high usage
- Monitor connection limits

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Netlify support automatic deployments:

1. Connect GitHub repository
2. Configure build settings
3. Every push to main branch triggers deployment
4. Preview deployments for pull requests

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          working-directory: ./frontend
```

## 🌐 Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

### Backend (Heroku)
```bash
heroku domains:add www.yourdomain.com
# Follow DNS instructions
```

## 🆘 Troubleshooting

### Common Issues

**Issue: API calls fail from production**
- Check CORS configuration
- Verify API URL in frontend environment variables
- Check backend logs for errors

**Issue: Database connection fails**
- Verify MongoDB connection string
- Check Network Access whitelist in Atlas
- Ensure database user has correct permissions

**Issue: Email not sending**
- Verify email credentials
- Check spam folder
- Review email service logs

**Issue: Build fails**
- Check Node.js version compatibility
- Clear build cache
- Review build logs for specific errors

## 📱 Post-Deployment

1. **Test Everything**
   - All pages and features
   - Forms and API calls
   - Responsive design
   - Cross-browser compatibility

2. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Verify meta tags
   - Check page load speed

3. **Analytics**
   - Set up Google Analytics
   - Configure tracking events

4. **Maintenance**
   - Set up backup strategy
   - Plan regular updates
   - Monitor performance

## 🎉 Success!

Your portfolio is now live! Share it:
- Update LinkedIn profile
- Add to resume
- Share on social media
- Add to GitHub profile README

---

**Need Help?** Open an issue in the GitHub repository or contact support.
