import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheck } from 'react-icons/fi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { projectsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getById(id);
      setProject(response.data.data);
    } catch (error) {
      toast.error('Failed to load project details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-dark-900 mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-primary-600 hover:text-primary-700">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Projects</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="pt-24 pb-20 bg-white min-h-screen">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
          >
            <FiArrowLeft /> Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full rounded-xl shadow-lg"
              />

              {/* Links */}
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 inline-flex items-center justify-center gap-2"
                  >
                    <FiGithub /> View Code
                  </a>
                )}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full mb-4">
                  {project.category}
                </span>
                <h1 className="text-4xl font-heading font-bold text-dark-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-dark-600">{project.description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-heading font-bold text-dark-900 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-dark-700">
                        <FiCheck className="text-primary-600 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Description */}
              <div>
                <h3 className="text-xl font-heading font-bold text-dark-900 mb-3">
                  About This Project
                </h3>
                <p className="text-dark-700 leading-relaxed whitespace-pre-line">
                  {project.detailedDescription}
                </p>
              </div>

              {/* Challenges & Solutions */}
              {project.challenges && project.solutions && (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-dark-900 mb-2">Challenges</h4>
                    <p className="text-dark-700">{project.challenges}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-dark-900 mb-2">Solutions</h4>
                    <p className="text-dark-700">{project.solutions}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
