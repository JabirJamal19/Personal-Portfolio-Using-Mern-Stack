import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';

dotenv.config();

const sampleBlogs = [
  {
    title: 'Getting Started with MERN Stack Development',
    slug: 'getting-started-mern-stack',
    excerpt: 'Learn how to build full-stack applications using MongoDB, Express, React, and Node.js. A comprehensive guide for beginners.',
    content: `
# Introduction to MERN Stack

The MERN stack is one of the most popular technology stacks for building modern web applications. In this guide, I'll share my experience and insights on getting started with MERN development.

## What is MERN Stack?

MERN stands for:
- **MongoDB** - NoSQL database for storing data
- **Express.js** - Backend web framework for Node.js
- **React.js** - Frontend library for building user interfaces
- **Node.js** - JavaScript runtime environment

## Why Choose MERN Stack?

1. **JavaScript Everywhere** - Use the same language for both frontend and backend
2. **High Performance** - React's virtual DOM and Node.js event-driven architecture
3. **Large Community** - Extensive resources, libraries, and support
4. **Scalability** - Build applications that can grow with your needs

## Prerequisites

Before starting with MERN, you should be familiar with:
- JavaScript (ES6+ features)
- HTML & CSS
- Basic understanding of APIs
- Command line basics

## Getting Started

### 1. Set Up Your Environment

First, install the necessary tools:
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- A code editor (VS Code recommended)
- Git for version control

### 2. Create Your First MERN App

Start with the backend:
\`\`\`bash
mkdir my-mern-app
cd my-mern-app
npm init -y
npm install express mongoose dotenv
\`\`\`

### 3. Build a Simple API

Create a basic Express server:
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from MERN!' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
\`\`\`

## Best Practices

1. **Use Environment Variables** - Never hardcode sensitive data
2. **Error Handling** - Always handle errors gracefully
3. **Code Organization** - Follow MVC or similar patterns
4. **Security** - Implement authentication and validation
5. **Testing** - Write tests for your code

## Common Challenges

- **State Management** - Learn Redux or Context API
- **Authentication** - Implement JWT properly
- **Database Design** - Plan your schema carefully
- **Deployment** - Understand the deployment process

## Conclusion

MERN stack development is an exciting journey. Start with small projects, build your portfolio, and keep learning. The community is very supportive, so don't hesitate to ask questions!

Happy coding! 🚀
    `,
    author: 'Jabir Jamal',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['MERN Stack', 'Tutorial', 'Web Development', 'Beginner'],
    category: 'Tutorial',
    published: true,
    readTime: 8,
    views: 0
  },
  {
    title: 'Top 10 Tips for Junior Developers',
    slug: 'top-10-tips-junior-developers',
    excerpt: 'Essential advice for developers starting their career in tech. Learn from real experiences and avoid common pitfalls.',
    content: `
# Top 10 Tips for Junior Developers

Starting your career as a junior developer can be overwhelming. Here are my top tips based on personal experience and lessons learned during my journey.

## 1. Build Real Projects

Don't just follow tutorials - build your own projects. This is the best way to learn and create a portfolio that showcases your skills.

**What to build:**
- Personal portfolio website
- Full-stack applications
- Open-source contributions
- Projects that solve real problems

## 2. Learn to Debug Effectively

Debugging is a crucial skill that will save you countless hours.

**Tips:**
- Read error messages carefully
- Use browser DevTools
- Learn to use debugger statements
- Google is your friend

## 3. Master Version Control (Git)

Git is essential for any developer. Learn it well.

**Must-know commands:**
\`\`\`bash
git init
git add .
git commit -m "message"
git push
git pull
git branch
git merge
\`\`\`

## 4. Write Clean, Readable Code

Code is read more than it's written. Make it easy for others (and future you) to understand.

**Best practices:**
- Use meaningful variable names
- Add comments when necessary
- Follow consistent formatting
- Keep functions small and focused

## 5. Don't Be Afraid to Ask Questions

No one knows everything. Asking questions is a sign of growth, not weakness.

**How to ask:**
- Research first
- Explain what you've tried
- Be specific about the problem
- Share relevant code snippets

## 6. Understand the Fundamentals

Don't just learn frameworks - understand the underlying concepts.

**Focus on:**
- JavaScript fundamentals
- How the web works
- Data structures and algorithms
- Design patterns

## 7. Stay Updated but Don't Chase Every Trend

Technology changes fast, but fundamentals remain constant.

**Strategy:**
- Follow tech blogs and newsletters
- Learn new tools when they're stable
- Focus on understanding concepts
- Don't feel pressured to learn everything

## 8. Build a Strong Online Presence

Your online presence is your digital resume.

**Essential platforms:**
- GitHub - Showcase your code
- LinkedIn - Professional network
- Twitter - Connect with developers
- Personal blog - Share your knowledge

## 9. Learn to Read Documentation

Good developers know how to find answers in documentation.

**Tips:**
- Start with official docs
- Look for code examples
- Check the API reference
- Read the changelog

## 10. Take Care of Your Health

Coding is a marathon, not a sprint. Take care of yourself.

**Remember to:**
- Take regular breaks
- Exercise and stay active
- Get enough sleep
- Maintain work-life balance
- Don't burn out

## Bonus Tips

- **Network** - Attend meetups and conferences
- **Contribute** - Get involved in open source
- **Practice** - Code regularly, even if just for 30 minutes
- **Teach** - Teaching others helps you learn better
- **Be Patient** - Everyone learns at their own pace

## Conclusion

Your journey as a developer is unique. These tips will help guide you, but remember that making mistakes is part of learning. Stay curious, keep building, and never stop learning!

What tips would you add to this list? Let me know in the comments!
    `,
    author: 'Jabir Jamal',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    tags: ['Career', 'Tips & Tricks', 'Beginner', 'Web Development'],
    category: 'Career',
    published: true,
    readTime: 6,
    views: 0
  },
  {
    title: 'My Journey from University to Web Developer',
    slug: 'my-journey-university-to-web-developer',
    excerpt: 'How I transitioned from computer science student to a professional web developer. My experiences, challenges, and lessons learned.',
    content: `
# My Journey: From University to Web Developer

Hello! I'm Jabir Jamal, and I want to share my journey from being a computer science student to becoming a Junior MERN Stack Developer.

## The Beginning

I started my journey at City University of Science and Information Technology (CUSIT) in 2021, pursuing a Bachelor's degree in Software Engineering.

**Initial challenges:**
- Choosing what to specialize in
- Overwhelming amount of technologies
- Balancing theory and practical skills
- Building confidence

## Discovery Phase

During my second year, I discovered web development and fell in love with it.

**What attracted me:**
- Immediate visual feedback
- Creative and technical blend
- Strong job market demand
- Ability to build real products

## First Steps into Development

I started with the basics:
1. **HTML & CSS** - Building static websites
2. **JavaScript** - Adding interactivity
3. **PHP & MySQL** - Backend development
4. **React.js** - Modern frontend

## The Internship Experience

In September 2022, I joined Xpert IT and Solutions Center as a Web Developer Intern.

**What I learned:**
- Working with real clients
- Meeting deadlines
- Team collaboration
- Professional communication
- Production-level code quality

**Key projects:**
- Built custom CMS panels
- Created admin dashboards
- Implemented responsive designs
- Managed client requirements

## Transition to Junior Developer

After my successful internship, I was promoted to Junior Web Developer from December 2022 to June 2023.

**New responsibilities:**
- Direct client interactions
- Full project lifecycle
- Backend integration
- Technical support and maintenance

**Technologies I mastered:**
- JavaScript frameworks
- MySQL databases
- PHP backend
- Responsive design
- Cross-browser compatibility

## Learning MERN Stack

I decided to specialize in MERN stack because:
- JavaScript everywhere (frontend + backend)
- Modern and in-demand
- Great community support
- Perfect for full-stack development

**My learning path:**
1. **MongoDB** - NoSQL database
2. **Express.js** - Backend framework
3. **React.js** - Already familiar
4. **Node.js** - JavaScript runtime

## Projects That Shaped Me

### 1. Food Delivery Platform
Built during my time at Xpert IT, featuring:
- Real-time order tracking
- Payment integration
- Admin dashboard

### 2. Learning Management System
Educational platform with:
- Role-based access
- Course management
- Progress tracking

### 3. This Portfolio
My personal portfolio showcasing:
- MERN stack skills
- Project gallery
- Blog system

## Challenges I Faced

### Technical Challenges
- Understanding async JavaScript
- Managing state in React
- Database design decisions
- Deployment and DevOps

### Personal Challenges
- Imposter syndrome
- Time management
- Staying motivated
- Continuous learning

## How I Overcame Them

1. **Build Projects** - Hands-on practice
2. **Ask Questions** - No shame in learning
3. **Join Communities** - Learn from others
4. **Stay Consistent** - Code every day
5. **Document Learning** - Write about it

## Certifications

Along the way, I earned certifications:
- HP LIFE Business Email Certification (2025)
- NAVTTC Web & Graphic Design Certification (2023)

These helped validate my skills and boost confidence.

## Current Focus

I'm currently focusing on:
- Advanced React patterns
- Microservices architecture
- Cloud deployment (AWS, Azure)
- System design
- Contributing to open source

## Advice for Students

### Do's
✅ Build real projects, not just tutorials
✅ Create a strong GitHub profile
✅ Network with other developers
✅ Learn to solve problems independently
✅ Keep your portfolio updated

### Don'ts
❌ Don't just watch tutorials
❌ Don't try to learn everything at once
❌ Don't compare your journey to others
❌ Don't give up when it gets hard
❌ Don't neglect the fundamentals

## What's Next?

My goals for the next year:
- Land a full-time MERN stack position
- Contribute to major open-source projects
- Master TypeScript
- Learn cloud technologies (AWS/Azure)
- Build a SaaS product

## Final Thoughts

The journey from student to developer is challenging but incredibly rewarding. Every developer's path is different - this was mine.

**Key takeaways:**
- Start with small steps
- Be consistent
- Build a portfolio
- Never stop learning
- Help others when you can

Remember: Every expert was once a beginner. Your journey is just beginning, and the possibilities are endless!

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/jabirjamal22/) or [GitHub](https://github.com/JabirJamal19)!

---

*What's your developer journey like? I'd love to hear about it in the comments!*
    `,
    author: 'Jabir Jamal',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    tags: ['Career', 'Personal Story', 'Web Development', 'MERN Stack'],
    category: 'Career',
    published: true,
    readTime: 12,
    views: 0
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing blogs');

    await Blog.insertMany(sampleBlogs);
    console.log('✅ Sample blogs added');
    console.log(`📝 Added ${sampleBlogs.length} blog posts`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    process.exit(1);
  }
};

seedBlogs();
