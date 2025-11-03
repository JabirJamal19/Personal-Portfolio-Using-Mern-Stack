import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiEye } from 'react-icons/fi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { blogAPI } from '../utils/api';
import toast from 'react-hot-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBySlug(slug);
      setBlog(response.data.data);
      // Increment view count
      await blogAPI.incrementViews(slug);
    } catch (error) {
      toast.error('Failed to load blog post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-dark-900 mb-4">Blog Post Not Found</h2>
        <Link to="/blog" className="text-primary-600 hover:text-primary-700">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <article className="pt-24 pb-20 bg-white min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
          >
            <FiArrowLeft /> Back to Blog
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-dark-600 mb-6">
              <span className="flex items-center gap-2">
                <FiCalendar />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-2">
                <FiClock />
                {blog.readTime} min read
              </span>
              <span className="flex items-center gap-2">
                <FiEye />
                {blog.views} views
              </span>
              <span className="text-dark-700 font-medium">By {blog.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-dark-100 text-dark-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-dark-700 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-dark-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-600 mb-2">Share this post</p>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <Link to="/blog" className="text-primary-600 hover:text-primary-700">
                ← Back to Blog
              </Link>
            </div>
          </motion.footer>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
