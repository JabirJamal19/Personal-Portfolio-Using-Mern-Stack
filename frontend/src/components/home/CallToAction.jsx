import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-50 transition-colors"
          >
            <FiMail size={24} />
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
