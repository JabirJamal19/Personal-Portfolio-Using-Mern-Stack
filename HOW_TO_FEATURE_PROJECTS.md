# 🌟 How to Feature Projects on Homepage

## What is a Featured Project?

Featured projects are special projects that appear on your homepage. Only the **top 3 featured projects** will be displayed on the homepage, with a star badge (⭐ Featured) to highlight them.

## How the System Works

### Homepage Display
- Shows **maximum 3 projects** marked as `featured: true`
- Projects are sorted by:
  1. `order` field (lower numbers first)
  2. `createdAt` date (newest first)
- Only shows projects with `status: 'completed'`

### Star Badge
Projects marked as featured will show a **yellow star badge** on both:
- ✨ Homepage featured section
- ✨ All projects page

## 🔧 Methods to Mark Projects as Featured

### Method 1: Using Seed Script (Recommended for Initial Setup)

Edit `backend/scripts/seedProjects.js`:

```javascript
const sampleProjects = [
  {
    title: 'Your Amazing Project',
    // ... other fields ...
    featured: true,    // ⭐ Set to true to feature
    order: 1,          // Lower numbers appear first
    status: 'completed'
  },
  {
    title: 'Another Project',
    featured: false,   // Not featured
    order: 2,
    status: 'completed'
  }
];
```

Then run:
```bash
cd backend
node scripts/seedProjects.js
```

### Method 2: Direct Database Update (MongoDB Compass or CLI)

**Using MongoDB Compass:**
1. Connect to your database
2. Select `portfolio` database
3. Open `projects` collection
4. Find your project
5. Edit the document:
   - Set `featured: true`
   - Set `order: 1` (or 2, 3 for priority)
   - Ensure `status: 'completed'`
6. Save

**Using MongoDB CLI:**
```bash
# Connect to MongoDB
mongosh

# Use your database
use portfolio

# Mark a project as featured
db.projects.updateOne(
  { title: "MealMate - Food Delivery App" },
  { 
    $set: { 
      featured: true,
      order: 1,
      status: 'completed'
    } 
  }
)

# View featured projects
db.projects.find({ featured: true }).sort({ order: 1 })
```

### Method 3: Using API (Requires Authentication)

**Step 1: Create Admin Account**
```bash
# POST to http://localhost:5000/api/auth/register
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "admin"
}
```

**Step 2: Login**
```bash
# POST to http://localhost:5000/api/auth/login
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
# Save the returned token
```

**Step 3: Update Project**
```bash
# PUT to http://localhost:5000/api/projects/{project_id}
# Headers: Authorization: Bearer {your_token}
{
  "featured": true,
  "order": 1,
  "status": "completed"
}
```

### Method 4: Using Postman

1. **Create New Request**: PUT `http://localhost:5000/api/projects/{project_id}`
2. **Authorization Tab**: 
   - Type: Bearer Token
   - Token: {your_admin_token}
3. **Body Tab** (JSON):
   ```json
   {
     "featured": true,
     "order": 1
   }
   ```
4. **Send Request**

## 📊 Understanding the `order` Field

The `order` field determines which featured projects appear first:

```javascript
{
  order: 1  // Appears 1st on homepage
}
{
  order: 2  // Appears 2nd on homepage
}
{
  order: 3  // Appears 3rd on homepage
}
{
  order: 4  // Won't show on homepage (only top 3)
}
```

## ✅ Checklist for Featured Projects

To ensure a project appears on the homepage:
- [ ] `featured: true`
- [ ] `status: 'completed'`
- [ ] `order: 1, 2, or 3` (for top 3 positions)
- [ ] Has good `imageUrl`
- [ ] Has complete project details

## 🎯 Best Practices

### 1. **Choose Your Best Work**
Feature your most impressive or recent projects that best showcase your skills.

### 2. **Keep Order Updated**
```javascript
// Example: Prioritize projects
MealMate: { featured: true, order: 1 }  // Best project
EduTrack: { featured: true, order: 2 }  // Second best
Q-AdConnect: { featured: true, order: 3 }  // Third best
```

### 3. **Update Regularly**
- Change featured projects when you complete new work
- Keep your homepage fresh with latest achievements

### 4. **Use High-Quality Images**
Featured projects are prominently displayed, so use professional images.

## 🔄 Quick Commands

### View Current Featured Projects
```javascript
// MongoDB CLI
db.projects.find({ featured: true }).sort({ order: 1 })
```

### Feature a Project
```javascript
db.projects.updateOne(
  { _id: ObjectId("your_project_id") },
  { $set: { featured: true, order: 1 } }
)
```

### Unfeature a Project
```javascript
db.projects.updateOne(
  { _id: ObjectId("your_project_id") },
  { $set: { featured: false } }
)
```

### Count Featured Projects
```javascript
db.projects.countDocuments({ featured: true })
```

## 📝 Example: Complete Featured Project

```javascript
{
  "_id": ObjectId("..."),
  "title": "MealMate - Food Delivery App",
  "description": "Full-stack food delivery platform with real-time tracking",
  "detailedDescription": "Complete description...",
  "technologies": ["React.js", "Node.js", "MongoDB", "Socket.io"],
  "category": "Full Stack",
  "imageUrl": "https://images.unsplash.com/photo-...",
  "liveUrl": "https://mealmate-demo.com",
  "githubUrl": "https://github.com/username/mealmate",
  "features": [
    "Real-time order tracking",
    "Payment integration",
    // ...
  ],
  "order": 1,           // ⭐ Featured order
  "featured": true,     // ⭐ Mark as featured
  "status": "completed" // ⭐ Must be completed
}
```

## 🐛 Troubleshooting

### Projects Not Showing on Homepage?

**Check 1: Are they marked as featured?**
```javascript
db.projects.find({ featured: true })
```

**Check 2: Are they completed?**
```javascript
db.projects.find({ featured: true, status: 'completed' })
```

**Check 3: Backend running?**
- Visit: `http://localhost:5000/api/projects/featured`
- Should return array of projects

**Check 4: Frontend connected?**
- Check browser console for errors
- Verify `VITE_API_URL` in frontend `.env`

### Star Badge Not Showing?

The star badge should appear automatically on featured projects. If not:
1. Clear browser cache
2. Restart frontend dev server
3. Check that `project.featured` is `true` in database

## 🎨 Customizing the Star Badge

The star badge appearance is in `FeaturedProjects.jsx` and `Projects.jsx`:

```jsx
{project.featured && (
  <div className="absolute top-3 right-3 bg-yellow-400 text-dark-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-lg">
    <FiStar className="fill-dark-900" size={14} />
    Featured
  </div>
)}
```

**To customize:**
- Change `bg-yellow-400` to different color
- Modify text "Featured" to anything else
- Adjust position (`top-3 right-3`)
- Change icon size

## 📱 Testing

After marking projects as featured:

1. **Homepage**: Should show max 3 projects with star badges
2. **Projects Page**: All featured projects show star badges
3. **Order**: Projects should appear in correct order (1, 2, 3)

---

**Quick Reference:**
- ⭐ `featured: true` = Shows on homepage
- 🔢 `order: 1-3` = Top 3 positions
- ✅ `status: 'completed'` = Required
- 🏠 Homepage shows only 3
- 📄 Projects page shows all

**Questions?** Check the main [README.md](README.md) or open an issue.
