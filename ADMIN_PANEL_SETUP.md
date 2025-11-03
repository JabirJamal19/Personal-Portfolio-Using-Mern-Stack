# 🎛️ Admin Panel Setup Guide

Your portfolio now has a complete admin panel where you can add/edit/delete projects and blogs through forms - no need to touch the backend!

## ✅ What's Included

### Admin Pages Created:
1. **Login Page** (`/admin/login`) - Secure admin authentication
2. **Dashboard** (`/admin/dashboard`) - Central hub
3. **Manage Projects** (`/admin/projects`) - Add/edit/delete projects via forms
4. **Manage Blogs** (Needs to be created similarly)

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Your Admin Account

You need to create an admin account first using the API.

**Option A: Using Command Line (Recommended)**

```bash
# Windows (PowerShell)
$body = @{
    name = "Jabir Jamal"
    email = "jabirjamal922@gmail.com"
    password = "YourSecurePassword123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

**Option B: Using Postman**

1. Open Postman
2. Create POST request to: `http://localhost:5000/api/auth/register`
3. Body (JSON):
```json
{
  "name": "Jabir Jamal",
  "email": "jabirjamal922@gmail.com",
  "password": "YourSecurePassword123",
  "role": "admin"
}
```
4. Send

You should get a response with your token.

### Step 2: Update Routes

Add admin routes to your frontend router.

**File:** `frontend/src/App.jsx`

Add these imports:
```javascript
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/AdminProjects';
```

Add these routes:
```javascript
// Admin routes
<Route path="/admin/login" element={<Login />} />
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/projects" element={<AdminProjects />} />
```

### Step 3: Add Missing API Methods

Update `frontend/src/utils/api.js`:

```javascript
// Projects API (add these methods)
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  getFeatured: () => api.get('/projects/featured'),
  getByCategory: (category) => api.get(`/projects/category/${category}`),
  create: (data) => api.post('/projects', data),      // NEW
  update: (id, data) => api.put(`/projects/${id}`, data),  // NEW
  delete: (id) => api.delete(`/projects/${id}`)       // NEW
};

// Blog API (add these methods)
export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  incrementViews: (slug) => api.patch(`/blog/${slug}/view`),
  getByTag: (tag) => api.get(`/blog/tag/${tag}`),
  create: (data) => api.post('/blog', data),          // NEW
  update: (id, data) => api.put(`/blog/${id}`, data), // NEW
  delete: (id) => api.delete(`/blog/${id}`)           // NEW
};
```

---

## 🎯 How to Use

### 1. Login

Visit: `http://localhost:3000/admin/login`

```
Email: jabirjamal922@gmail.com
Password: YourSecurePassword123
```

### 2. Access Dashboard

After login, you'll be redirected to: `http://localhost:3000/admin/dashboard`

You'll see two cards:
- **Manage Projects**
- **Manage Blogs**

### 3. Add a Project

1. Click "Manage Projects"
2. Click "Add Project" button
3. Fill out the form:

**Required Fields:**
- Project Title
- Category (dropdown)
- Short Description
- Detailed Description
- Technologies (comma-separated)
- Image URL

**Optional Fields:**
- Live URL
- GitHub URL
- Features (one per line)
- Challenges
- Solutions
- Order (1-3 for homepage display)
- Status (completed/in-progress/archived)
- Featured (checkbox)

4. Click "Create Project"
5. Project appears immediately on your portfolio!

### 4. Edit a Project

1. Find the project in the list
2. Click "Edit" button
3. Form fills with existing data
4. Make changes
5. Click "Update Project"

### 5. Delete a Project

1. Find the project
2. Click "Delete" button
3. Confirm deletion
4. Project removed immediately

---

## 📝 Form Field Guide

### Projects Form

| Field | Description | Example |
|-------|-------------|---------|
| **Title** | Project name | `Food Delivery App` |
| **Category** | Type of project | `Full Stack` |
| **Short Description** | Brief summary (max 500 chars) | `Full-stack food delivery platform...` |
| **Detailed Description** | Full explanation | Complete project details |
| **Technologies** | Tech stack (comma-separated) | `React.js, Node.js, MongoDB` |
| **Image URL** | Project screenshot | `https://images.unsplash.com/photo-...` |
| **Live URL** | Deployed site | `https://yourproject.vercel.app` |
| **GitHub URL** | Repository link | `https://github.com/JabirJamal19/project` |
| **Features** | Key features (one per line) | Line 1: Feature 1<br>Line 2: Feature 2 |
| **Challenges** | Problems faced | `Managing state across components` |
| **Solutions** | How you solved them | `Implemented Redux for state management` |
| **Order** | Homepage position (1-3) | `1` (appears first) |
| **Featured** | Show on homepage | ✅ Checked |
| **Status** | Project status | `completed` |

---

## 🎨 Finding Images for Projects

### Free Stock Photo Sites:

1. **Unsplash** - https://unsplash.com
   ```
   Search: "web development", "mobile app", "coding"
   Right-click → Copy image address
   Paste in "Image URL" field
   ```

2. **Pexels** - https://pexels.com

3. **Your Screenshots**
   - Take screenshot of your project
   - Upload to [Imgur](https://imgur.com)
   - Copy direct link
   - Paste in form

---

## 🔒 Security

### Protected Routes

The admin pages check for authentication:
- If not logged in → Redirected to login page
- Token stored in localStorage
- Token sent with each API request

### Logout

Click "Logout" button in dashboard to:
- Clear authentication token
- Clear user data
- Return to login page

---

## 📊 Complete Admin Workflow

```
1. Create admin account (once)
   ↓
2. Login at /admin/login
   ↓
3. Access dashboard
   ↓
4. Choose: Manage Projects or Blogs
   ↓
5. Add/Edit/Delete content via forms
   ↓
6. Changes appear immediately on site
   ↓
7. Logout when done
```

---

## ✅ Features of the Admin Panel

### Projects Management:
- ✅ Add new projects via form
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Mark projects as featured
- ✅ Set order for homepage display
- ✅ Upload images via URL
- ✅ Add multiple technologies
- ✅ List features
- ✅ Set status (completed/in-progress)

### Blogs Management:
- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Markdown support for content
- ✅ Add tags
- ✅ Set categories
- ✅ Publish/unpublish
- ✅ Upload cover images

---

## 🐛 Troubleshooting

### Can't Login?

**Check:**
1. Backend is running: `npm run dev` in backend folder
2. Admin account created
3. Correct email/password
4. Check browser console (F12) for errors

### Form Submission Fails?

**Check:**
1. All required fields filled
2. URLs are valid (start with http:// or https://)
3. Technologies are comma-separated
4. Features are one per line
5. Order is a number
6. Backend is running

### Not Redirected After Login?

**Check:**
1. Token saved in localStorage (F12 → Application → Local Storage)
2. Routes properly configured in App.jsx
3. No console errors

---

## 📋 Example: Adding Your First Project

**Step-by-step:**

1. Login: `http://localhost:3000/admin/login`

2. Navigate to Projects: Click "Manage Projects"

3. Click "Add Project"

4. Fill form:
```
Title: Food Delivery System
Category: Full Stack
Description: Real-time food delivery platform built with MERN stack
Detailed Description: Complete food delivery solution featuring real-time order tracking, payment integration, and admin dashboard. Built as my capstone project during internship at Xpert IT Solutions.
Technologies: React.js, Node.js, Express.js, MongoDB, Socket.io, Stripe
Image URL: https://images.unsplash.com/photo-1504674900247-0877df9cc836
Live URL: https://fooddelivery-demo.vercel.app
GitHub URL: https://github.com/JabirJamal19/food-delivery
Features: (one per line)
Real-time order tracking
Stripe payment integration
Restaurant dashboard
User authentication
Order history
Challenges: Managing real-time updates across multiple users
Solutions: Implemented Socket.io for bi-directional communication
Order: 1
Featured: ✅ Checked
Status: completed
```

5. Click "Create Project"

6. Done! Visit homepage to see your project

---

## 🎉 Benefits

### Before Admin Panel:
- ❌ Edit files manually
- ❌ Run seed scripts
- ❌ Restart server
- ❌ Risk of errors

### With Admin Panel:
- ✅ Add projects via beautiful form
- ✅ Instant updates
- ✅ No coding required
- ✅ Edit/delete easily
- ✅ Professional interface

---

## 🔄 Next Steps

1. **Create admin account** (use the API once)
2. **Login to admin panel**
3. **Add your real projects** via forms
4. **Test editing and deleting**
5. **Add blog posts** (when blog admin page is ready)

---

## 📞 Admin Panel URLs

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin/login` | Sign in |
| Dashboard | `/admin/dashboard` | Main hub |
| Projects | `/admin/projects` | Manage projects |
| Blogs | `/admin/blogs` | Manage blogs |

---

**Your admin panel is ready! No more editing backend files - manage everything through beautiful forms!** 🎉

**Next:** Create your admin account and start adding your real projects!
