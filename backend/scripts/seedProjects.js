import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const sampleProjects = [
  {
    title: 'MealMate - Food Delivery App',
    description: 'Full-stack food delivery platform with real-time order tracking and payment integration',
    detailedDescription: 'MealMate is a comprehensive food delivery application built with the MERN stack. Features include real-time order tracking using Socket.io, Stripe payment integration, restaurant management dashboard, and optimized MongoDB queries for fast performance.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Stripe', 'Redux', 'TailwindCSS'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    liveUrl: 'https://mealmate-demo.com',
    githubUrl: 'https://github.com/yourusername/mealmate',
    features: [
      'Real-time order tracking with Socket.io',
      'Secure payment processing with Stripe',
      'Restaurant dashboard for order management',
      'User authentication with JWT',
      'Optimized database queries for performance'
    ],
    challenges: 'Implementing real-time updates across multiple users while maintaining performance',
    solutions: 'Utilized Socket.io for efficient bi-directional communication and Redis caching for frequently accessed data',
    order: 1,          // Featured position 1 (appears first on homepage)
    featured: true,    // ⭐ Featured on homepage
    status: 'completed'
  },
  {
    title: 'EduTrack - Learning Management System',
    description: 'Educational platform with role-based access for students and administrators',
    detailedDescription: 'EduTrack is a robust learning management system designed for educational institutions. It features course management, student enrollment, progress tracking, and comprehensive admin controls.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Material-UI'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    liveUrl: 'https://edutrack-demo.com',
    githubUrl: 'https://github.com/yourusername/edutrack',
    features: [
      'Role-based access control (Admin/Teacher/Student)',
      'Course creation and management',
      'Real-time progress tracking',
      'Assignment submission system',
      'Grade management dashboard'
    ],
    challenges: 'Managing complex role-based permissions and ensuring data security',
    solutions: 'Implemented middleware-based authentication and authorization with JWT tokens',
    order: 2,          // Featured position 2 (appears second on homepage)
    featured: true,    // ⭐ Featured on homepage
    status: 'completed'
  },
  {
    title: 'Q-AdConnect - Ad Management Platform',
    description: 'Advertisement management system with RESTful APIs and optimized queries',
    detailedDescription: 'Q-AdConnect is a scalable ad management platform for digital advertising campaigns. Features include campaign creation, analytics dashboard, and automated ad scheduling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Redis'],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    liveUrl: 'https://qadconnect-demo.com',
    githubUrl: 'https://github.com/yourusername/qadconnect',
    features: [
      'Campaign management dashboard',
      'Real-time analytics and reporting',
      'Automated ad scheduling',
      'Budget tracking and alerts',
      'RESTful API for integrations'
    ],
    challenges: 'Optimizing database queries for large datasets and real-time analytics',
    solutions: 'Implemented MongoDB aggregation pipelines and Redis caching for improved performance',
    order: 3,          // Featured position 3 (appears third on homepage)
    featured: true,    // ⭐ Featured on homepage
    status: 'completed'
  }
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    await Project.insertMany(sampleProjects);
    console.log('✅ Sample projects added');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedProjects();
