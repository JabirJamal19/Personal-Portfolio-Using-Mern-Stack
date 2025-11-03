# MERN Stack Portfolio Website

A professional, full-stack portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to showcase projects, skills, and professional experience.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)

## 🚀 Features

### Frontend
- **Modern React UI** - Built with React 18 and Vite for optimal performance
- **Responsive Design** - Mobile-first approach using TailwindCSS
- **Smooth Animations** - Framer Motion for engaging user interactions
- **SEO Optimized** - React Helmet Async for meta tags and SEO
- **Dynamic Content** - Real-time data fetching from backend API

### Backend
- **RESTful API** - Express.js with clean architecture
- **MongoDB Database** - Mongoose ODM for data modeling
- **Authentication** - JWT-based secure authentication
- **Email Integration** - Nodemailer for contact form submissions
- **Security** - Helmet, CORS, rate limiting, and input validation
- **Performance** - Compression middleware and optimized queries

### Key Pages
- **Home** - Hero section, about, skills, and featured projects
- **Projects** - Filterable project gallery with detailed pages
- **Blog** - Articles and tutorials with search and tags
- **Contact** - Contact form with backend integration

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- npm or yarn package manager
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your credentials
# Required: MONGODB_URI, JWT_SECRET, Email settings
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your API URL
```

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option B: MongoDB Atlas**
- Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Update `MONGODB_URI` in backend `.env`

### 5. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
mern-portfolio/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   ├── utils/           # Helper functions
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Backend dependencies
│   └── server.js        # Express app entry point
│
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── common/  # Reusable components
│   │   │   ├── home/    # Home page components
│   │   │   └── layout/  # Layout components
│   │   ├── data/        # Static data
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main App component
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # App entry point
│   ├── .env.example     # Environment variables template
│   ├── package.json     # Frontend dependencies
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md            # This file
```

## 🔧 Configuration

### Backend Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_EMAIL=contact@yourdomain.com
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_NAME=My Portfolio
VITE_SITE_DESCRIPTION=Professional MERN Stack Developer Portfolio
```

## 📝 Customization

### 1. Personal Information

Edit `frontend/src/data/profileData.js`:
- Update name, title, bio
- Add your contact information
- Update social media links
- Customize skills and certifications

### 2. Projects

Add projects via:
- **Admin Panel** (after authentication)
- **Seed Script** (edit `backend/scripts/seedProjects.js`)
- **API Endpoint** (POST `/api/projects`)

### 3. Styling

Customize colors in `frontend/tailwind.config.js`:
```js
colors: {
  primary: { /* Your brand colors */ },
  dark: { /* Your dark theme */ }
}
```

## 🌐 Deployment

### Backend Deployment (Heroku/Railway)

1. **Heroku:**
```bash
heroku create your-portfolio-api
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
git subtree push --prefix backend heroku main
```

2. **Railway:**
- Connect your GitHub repo
- Set environment variables
- Deploy from `backend` directory

### Frontend Deployment (Vercel/Netlify)

1. **Vercel:**
```bash
cd frontend
vercel --prod
```

2. **Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### Database (MongoDB Atlas)

- Already configured for cloud deployment
- Update `MONGODB_URI` in backend environment

## 🔐 Security Features

- JWT authentication for admin routes
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet for security headers
- CORS configuration
- Input validation and sanitization
- Protected admin routes

## 📧 Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the app password in `EMAIL_PASS`

For other providers, update `EMAIL_HOST` and `EMAIL_PORT`.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single post
- `POST /api/blog` - Create post (Admin)
- `PATCH /api/blog/:slug/view` - Increment views

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB for the database solution
- Express.js community
- TailwindCSS for the utility-first CSS framework
- Framer Motion for animations

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

**Built with ❤️ using MERN Stack**
