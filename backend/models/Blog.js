import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: true,
    default: 'Admin'
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/800x400'
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Web Development', 'MERN Stack', 'Tutorial', 'Tips & Tricks', 'Career', 'Other'],
    default: 'Web Development'
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  }
}, {
  timestamps: true
});

// Index for better query performance
// Note: slug already has unique index from schema definition (unique: true)
blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ tags: 1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
