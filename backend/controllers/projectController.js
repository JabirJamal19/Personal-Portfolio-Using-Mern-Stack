import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req, res) => {
  try {
    const { category, featured, status, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req, res) => {
  try {
    // Get top 3 featured projects for homepage
    const projects = await Project.find({ featured: true, status: 'completed' })
      .sort({ order: 1, createdAt: -1 })
      .limit(3);

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get projects by category
// @route   GET /api/projects/category/:category
// @access  Public
export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category }).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
