import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiCalendar, FiEye } from 'react-icons/fi';
import AnimatedSection from '../components/common/AnimatedSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { blogAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = ['All', 'MERN Stack', 'Tutorial', 'Web Development', 'Tips & Tricks', 'Career'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, activeTag, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll();
      setBlogs(response.data.data);
      setFilteredBlogs(response.data.data);
    } catch (error) {
      toast.error('Failed to load blog posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (activeTag !== 'All') {
      filtered = filtered.filter((b) => b.tags.includes(activeTag) || b.category === activeTag);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog | MERN Stack Development Insights</title>
        <meta name="description" content="Read articles about web development, MERN stack, and tech insights" />
      </Helmet>

      <div className="pt-24 pb-20 bg-dark-50 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="section-title">Blog</h1>
              <p className="section-subtitle mx-auto">
                Thoughts, tutorials, and insights on web development
              </p>
            </div>
          </AnimatedSection>

          {/* Search and Filter */}
          <AnimatedSection>
            <div className="mb-12">
              {/* Search Bar */}
              <div className="relative mb-6">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400" size={20} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Tag Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      activeTag === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-dark-700 hover:bg-primary-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark-600 text-lg">No blog posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-dark-600 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={14} />
                      {blog.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <FiEye size={14} />
                      {blog.views}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-dark-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-dark-100 text-dark-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    Read More →
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
