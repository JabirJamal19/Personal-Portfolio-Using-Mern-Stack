import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import AnimatedSection from '../common/AnimatedSection';
import LoadingSpinner from '../common/LoadingSpinner';
import { blogAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const BlogCard = ({ blog, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className="card group"
    >
      <Link to={`/blog/${blog.slug}`} className="block">
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
        </div>

        <h3 className="text-xl font-heading font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-dark-600 mb-4 line-clamp-3">{blog.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-dark-100 text-dark-700 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <span className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-2">
          Read More <FiArrowRight />
        </span>
      </Link>
    </motion.article>
  );
};

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAll({ limit: 3 });
      // Get only the 3 most recent blogs
      setBlogs(response.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Don't show error toast on homepage, just silently fail
    } finally {
      setLoading(false);
    }
  };

  // Don't render section if no blogs
  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-dark-50">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="section-title">Latest Blog Posts</h2>
            <p className="section-subtitle mx-auto">
              Insights, tutorials, and thoughts on web development
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} index={index} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
                View All Posts <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecentBlogs;
