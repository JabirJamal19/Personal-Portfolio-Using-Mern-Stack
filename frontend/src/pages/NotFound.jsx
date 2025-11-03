import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-9xl font-heading font-bold gradient-text mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-dark-600 mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <Link
              to="/"
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiHome />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
