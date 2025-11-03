import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiStar, FiArrowLeft } from 'react-icons/fi';
import { projectsAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    technologies: '',
    category: 'Full Stack',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    features: '',
    challenges: '',
    solutions: '',
    order: 0,
    featured: false,
    status: 'completed'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      features: formData.features.split('\n').filter(f => f.trim()),
      order: parseInt(formData.order)
    };

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData);
        toast.success('Project updated successfully!');
      } else {
        await projectsAPI.create(projectData);
        toast.success('Project created successfully!');
      }
      
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      technologies: project.technologies.join(', '),
      features: project.features.join('\n')
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      technologies: '',
      category: 'Full Stack',
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      features: '',
      challenges: '',
      solutions: '',
      order: 0,
      featured: false,
      status: 'completed'
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Projects - Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-dark-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-dark-200">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link to="/admin/dashboard" className="text-primary-600 hover:text-primary-700">
                  <FiArrowLeft size={24} />
                </Link>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-dark-900">
                    Manage Projects
                  </h1>
                  <p className="text-dark-600 text-sm mt-1">
                    {projects.length} projects
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus /> {showForm ? 'Cancel' : 'Add Project'}
              </button>
            </div>
          </div>
        </header>

        <div className="container-custom py-8">
          {/* Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h2 className="text-xl font-heading font-bold text-dark-900 mb-6">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="E.g., Food Delivery App"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Short Description * (max 500 characters)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    maxLength="500"
                    rows="3"
                    className="input-field"
                    placeholder="Brief description for cards..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="input-field"
                    placeholder="Full project description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Technologies * (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="React.js, Node.js, MongoDB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Live URL (optional)
                    </label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://your-project.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      GitHub URL (optional)
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Features (one per line)
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows="5"
                    className="input-field"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Challenges Faced
                    </label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleChange}
                      rows="3"
                      className="input-field"
                      placeholder="What challenges did you encounter?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Solutions Implemented
                    </label>
                    <textarea
                      name="solutions"
                      value={formData.solutions}
                      onChange={handleChange}
                      rows="3"
                      className="input-field"
                      placeholder="How did you solve them?"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Order (for featured)
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      min="0"
                      className="input-field"
                      placeholder="0"
                    />
                    <p className="text-xs text-dark-600 mt-1">1-3 for homepage display</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Featured
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="w-5 h-5 text-primary-600 rounded"
                      />
                      <span className="text-dark-700">Show on homepage</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-outline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-dark-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                      <FiStar className="fill-dark-900" size={12} />
                      Featured
                    </div>
                  )}
                </div>

                <h3 className="font-heading font-bold text-dark-900 mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-dark-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                    {project.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-dark-100 text-dark-700 rounded">
                    {project.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="btn-outline flex-1 text-sm py-2 flex items-center justify-center gap-1"
                  >
                    <FiEdit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="btn-outline flex-1 text-sm py-2 flex items-center justify-center gap-1 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <FiTrash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-600">No projects yet. Add your first project!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminProjects;
