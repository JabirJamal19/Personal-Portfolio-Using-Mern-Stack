# Portfolio Backend API

RESTful API built with Node.js, Express.js, and MongoDB for the portfolio website.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file

# Start development server
npm run dev

# Start production server
npm start
```

## 📋 Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_change_in_production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourportfolio.com
CONTACT_EMAIL=your_contact_email@gmail.com
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/:category` - Get projects by category
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/tag/:tag` - Get posts by tag
- `GET /api/blog/:slug` - Get single blog post
- `PATCH /api/blog/:slug/view` - Increment view count
- `POST /api/blog` - Create blog post (Admin only)
- `PUT /api/blog/:id` - Update blog post (Admin only)
- `DELETE /api/blog/:id` - Delete blog post (Admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin only)
- `PATCH /api/contact/:id/status` - Update contact status (Admin only)
- `DELETE /api/contact/:id` - Delete contact (Admin only)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/password` - Update password (Protected)

## 🔒 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗃️ Database Models

### Project
```javascript
{
  title: String,
  description: String,
  detailedDescription: String,
  technologies: [String],
  category: String,
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
  features: [String],
  challenges: String,
  solutions: String,
  order: Number,
  featured: Boolean,
  status: String
}
```

### Blog
```javascript
{
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  coverImage: String,
  tags: [String],
  category: String,
  published: Boolean,
  views: Number,
  readTime: Number
}
```

### Contact
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String,
  ipAddress: String,
  userAgent: String
}
```

## 🛠️ Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Seed sample projects
node scripts/seedProjects.js
```

## 📧 Email Setup

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the app password in `EMAIL_PASS`

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation
- MongoDB injection prevention

## 🚀 Deployment

### Heroku
```bash
heroku create your-api-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy

## 📝 Notes

- All routes under `/api/` are rate-limited
- Admin-only routes require authentication + admin role
- Contact form submissions send email notifications
- Blog views are tracked automatically
