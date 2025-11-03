import { Link } from 'react-router-dom';
import AnimatedSection from '../common/AnimatedSection';
import { profileData, education, experience, certifications } from '../../data/profileData';
import { FiAward, FiBriefcase, FiBook, FiArrowRight } from 'react-icons/fi';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle mx-auto">
              Get to know more about my background and expertise
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <AnimatedSection>
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-dark-900">
                Who I Am
              </h3>
              <p className="text-dark-700 leading-relaxed">{profileData.bio}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-dark-600">Email</p>
                  <p className="font-medium text-dark-900">{profileData.contact.email}</p>
                </div>
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-dark-600">Location</p>
                  <p className="font-medium text-dark-900">{profileData.contact.location}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 gap-6">
              {/* Education - Show only most recent */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                    <FiBook size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dark-900 mb-1">Education</h4>
                    {education.slice(0, 1).map((edu, index) => (
                      <div key={index} className="mt-2">
                        <p className="font-medium text-dark-800">{edu.degree}</p>
                        <p className="text-dark-600 text-sm">{edu.school}</p>
                        <p className="text-dark-500 text-sm">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience - Show only most recent */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                    <FiBriefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dark-900 mb-1">Experience</h4>
                    {experience.slice(0, 1).map((exp, index) => (
                      <div key={index} className="mt-2">
                        <p className="font-medium text-dark-800">{exp.position}</p>
                        <p className="text-dark-600 text-sm">{exp.company}</p>
                        <p className="text-dark-500 text-sm">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications - Show only one */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                    <FiAward size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-dark-900 mb-2">Recent Certification</h4>
                    <ul className="space-y-2">
                      {certifications.slice(0, 1).map((cert, index) => (
                        <li key={index} className="text-dark-700 text-sm">
                          • {cert.title} - <span className="text-dark-600">{cert.issuer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* View Full About Link */}
        <AnimatedSection>
          <div className="text-center">
            <Link 
              to="/about" 
              className="btn-outline inline-flex items-center gap-2"
            >
              View Full About Me <FiArrowRight />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
