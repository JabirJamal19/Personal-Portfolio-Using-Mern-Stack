import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { blogAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/common/ImageUpload';

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    status: 'published'
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert tags string to array
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, blogData);
        toast.success('Blog updated successfully!');
      } else {
        await blogAPI.create(blogData);
        toast.success('Blog created successfully!');
      }
      
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      tags: blog.tags?.join(', ') || '',
      status: blog.status
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await blogAPI.delete(id);
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      tags: '',
      status: 'published'
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-50 to-white flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage Blogs - Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-dark-50 to-white py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
              >
                <FiArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-heading font-bold text-dark-900">
                  Manage Blogs
                </h1>
                <p className="text-dark-600 mt-1">{blogs.length} blog posts</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center gap-2"
            >
              {showForm ? (
                <>
                  <FiX /> Cancel
                </>
              ) : (
                <>
                  <FiPlus /> Add Blog
                </>
              )}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="My Amazing Blog Post"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Slug (auto-generated)
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="input-field bg-dark-50"
                      placeholder="my-amazing-blog-post"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Career">Career</option>
                      <option value="Technology">Technology</option>
                      <option value="Tips & Tricks">Tips & Tricks</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Excerpt * (Short description)
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    maxLength="200"
                    className="input-field"
                    placeholder="A brief description of your blog post..."
                  />
                  <p className="text-sm text-dark-500 mt-1">
                    {formData.excerpt.length}/200 characters
                  </p>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Content * (Markdown supported)
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows="12"
                    className="input-field font-mono text-sm"
                    placeholder="Write your blog content here... You can use Markdown formatting."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <ImageUpload
                    currentImage={formData.image}
                    onImageUploaded={(url) => setFormData(prev => ({ ...prev, image: url }))}
                    label="Featured Image *"
                  />
                  
                  {/* Optional: Keep URL field for manual entry */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Or paste Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="React, JavaScript, Web Development"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <button type="submit" className="btn-primary">
                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Blogs Grid */}
          {blogs.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-dark-600 mb-4">No blog posts yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiPlus /> Add Your First Blog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card group"
                >
                  {/* Image */}
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-primary-600 font-medium">
                        {blog.category}
                      </span>
                      <span className="text-dark-400">•</span>
                      <span className="text-sm text-dark-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-900 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-dark-600 text-sm line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-dark-100 text-dark-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-dark-200">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBlogs;
