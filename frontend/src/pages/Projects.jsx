import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import AnimatedSection from '../components/common/AnimatedSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { projectsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'Other'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, activeCategory, projects]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
      setFilteredProjects(response.data.data);
    } catch (error) {
      toast.error('Failed to load projects');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (activeCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Projects | MERN Stack Developer Portfolio</title>
        <meta name="description" content="Explore my portfolio of web development projects built with MERN stack" />
      </Helmet>

      <div className="pt-24 pb-20 bg-dark-50 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="section-title">My Projects</h1>
              <p className="section-subtitle mx-auto">
                Explore my portfolio of web development projects
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
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-dark-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-dark-700 hover:bg-primary-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark-600 text-lg">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                          >
                            <FiExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full mb-3">
                    {project.category}
                  </span>

                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-2">
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
                    className="text-primary-600 font-medium hover:text-primary-700"
                  >
                    View Details →
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
