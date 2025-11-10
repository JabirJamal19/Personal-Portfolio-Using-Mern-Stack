import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { profileData } from '../../data/profileData';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark-900 mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{profileData.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-heading text-dark-700 mb-6"
            >
              {profileData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-dark-600 mb-8 max-w-xl"
            >
              {profileData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link to="/projects" className="btn-primary inline-flex items-center justify-center gap-2">
                View My Projects
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline inline-flex items-center justify-center">
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-dark-700 hover:text-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-dark-700 hover:text-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href={profileData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-dark-700 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2 w-full lg:w-1/2"
          >
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Animated gradient rings */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-30 blur-2xl animate-spin-slow"></div>
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-100 to-white p-2 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary-50 to-white">
                  <img
                    src="/Profile.png"
                    alt="Jabir Jamal - MERN Stack Developer"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 20%' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop';
                    }}
                  />
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-500 rounded-full opacity-20 blur-xl animate-bounce-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-primary-600 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
