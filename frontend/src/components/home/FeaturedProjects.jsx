import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import AnimatedSection from '../common/AnimatedSection';
import LoadingSpinner from '../common/LoadingSpinner';
import { projectsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card group"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-dark-900 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-lg">
            <FiStar className="fill-dark-900" size={14} />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-dark-900 hover:bg-primary-500 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-dark-900 hover:bg-primary-500 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
          {project.category}
        </span>
      </div>

      <h3 className="text-xl font-heading font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
        {project.title}
      </h3>

      <p className="text-dark-600 mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-dark-100 text-dark-700 rounded">
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/projects/${project._id}`}
        className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all"
      >
        View Details <FiArrowRight />
      </Link>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getFeatured();
        // Limit to top 3 featured projects for homepage
        setProjects(response.data.data.slice(0, 3));
      } catch (error) {
        toast.error('Failed to load projects. Make sure the backend is running!');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle mx-auto">
              Check out some of my recent work
            </p>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-dark-600 text-lg mb-4">No featured projects yet.</p>
            <p className="text-dark-500 text-sm">Run the seed script or mark projects as featured to display them here.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                View All Projects <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
