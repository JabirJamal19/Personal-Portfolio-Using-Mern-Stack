import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  detailedDescription: {
    type: String,
    required: true,
    maxlength: [2000, 'Detailed description cannot exceed 2000 characters']
  },
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'Other'],
    default: 'Full Stack'
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/600x400'
  },
  liveUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  features: [{
    type: String
  }],
  challenges: {
    type: String,
    maxlength: [1000, 'Challenges cannot exceed 1000 characters']
  },
  solutions: {
    type: String,
    maxlength: [1000, 'Solutions cannot exceed 1000 characters']
  },
  order: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'archived'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ category: 1, featured: -1, order: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
