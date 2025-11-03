# Portfolio Frontend

Modern React application built with Vite, TailwindCSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_NAME=My Portfolio
VITE_SITE_DESCRIPTION=Professional MERN Stack Developer Portfolio
```

## 🎨 Customization

### Personal Information

Edit `src/data/profileData.js`:

```javascript
export const profileData = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your Tagline",
  bio: "Your Bio",
  contact: { /* ... */ },
  social: { /* ... */ }
};

export const skills = {
  frontend: [ /* ... */ ],
  backend: [ /* ... */ ],
  tools: [ /* ... */ ]
};
```

### Colors & Theming

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize your brand colors
  }
}
```

### Fonts

Update in `index.html` and `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Poppins', 'sans-serif'],
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── AnimatedSection.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ScrollToTop.jsx
│   ├── home/            # Home page components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── FeaturedProjects.jsx
│   │   └── CallToAction.jsx
│   └── layout/          # Layout components
│       ├── Navbar.jsx
│       └── Footer.jsx
├── data/                # Static data
│   └── profileData.js
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── ProjectDetail.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── utils/               # Utilities
│   └── api.js          # API client
├── App.jsx             # Main app
├── index.css           # Global styles
└── main.jsx            # Entry point
```

## 🎯 Features

- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion
- **Dark/Light Mode Ready** - Easy to implement
- **SEO Optimized** - React Helmet Async
- **Fast Performance** - Vite + React 18
- **Type Safety Ready** - Easy TypeScript migration

## 🛠️ Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 📦 Main Dependencies

- **React 18** - UI library
- **React Router** - Routing
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Build Configuration

Make sure to set:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables from `.env`

## 🎨 Styling Guidelines

### Using TailwindCSS Classes

```jsx
// Button styles
className="btn-primary"
className="btn-secondary"
className="btn-outline"

// Cards
className="card"

// Inputs
className="input-field"

// Sections
className="section-title"
className="section-subtitle"

// Container
className="container-custom"
```

### Custom Animations

```jsx
// Fade in
className="animate-fade-in"

// Slide up
className="animate-slide-up"

// Scale in
className="animate-scale-in"
```

## 🔧 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📝 Notes

- Images are lazy-loaded for performance
- All API calls include error handling
- Toast notifications for user feedback
- Scroll restoration on route changes
- SEO meta tags on all pages
