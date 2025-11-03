import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiBook, FiDownload, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import AnimatedSection from '../components/common/AnimatedSection';
import { profileData, skills, education, experience, certifications } from '../data/profileData';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Me - {profileData.name}</title>
        <meta name="description" content={`Learn more about ${profileData.name}, ${profileData.title}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-dark-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <AnimatedSection>
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 blur-3xl"></div>
                  <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-primary-100 to-white p-3 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary-50 to-white">
                      <img
                        src="/Profile.png"
                        alt={profileData.name}
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center 20%' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Info */}
              <AnimatedSection>
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-heading font-bold text-dark-900">
                    {profileData.name}
                  </h1>
                  <p className="text-2xl text-primary-600 font-medium">
                    {profileData.title}
                  </p>
                  <p className="text-lg text-dark-700 leading-relaxed">
                    {profileData.tagline}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-dark-700">
                      <FiMail className="text-primary-600" size={20} />
                      <a href={`mailto:${profileData.contact.email}`} className="hover:text-primary-600 transition-colors">
                        {profileData.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-dark-700">
                      <FiPhone className="text-primary-600" size={20} />
                      <span>{profileData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-dark-700">
                      <FiMapPin className="text-primary-600" size={20} />
                      <span>{profileData.contact.location}</span>
                    </div>
                  </div>

                  {/* Download Resume */}
                  <div className="pt-4">
                    <a
                      href={profileData.resume}
                      download
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <FiDownload /> Download Resume
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 bg-white">
          <div className="container-custom max-w-4xl">
            <AnimatedSection>
              <h2 className="section-title">About Me</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-dark-700 leading-relaxed text-lg">
                  {profileData.bio}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-dark-50">
          <div className="container-custom">
            <AnimatedSection>
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle mx-auto">Technologies I work with</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Frontend Skills */}
              <AnimatedSection>
                <div className="card">
                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-6">
                    Frontend Development
                  </h3>
                  <div className="space-y-4">
                    {skills.frontend.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-dark-800 font-medium">{skill.name}</span>
                          <span className="text-primary-600 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Backend Skills */}
              <AnimatedSection>
                <div className="card">
                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-6">
                    Backend Development
                  </h3>
                  <div className="space-y-4">
                    {skills.backend.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-dark-800 font-medium">{skill.name}</span>
                          <span className="text-primary-600 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Tools & Others */}
              <AnimatedSection>
                <div className="card md:col-span-2">
                  <h3 className="text-xl font-heading font-bold text-dark-900 mb-6">
                    Tools & Technologies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.tools.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-dark-800 font-medium">{skill.name}</span>
                          <span className="text-primary-600 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 bg-white">
          <div className="container-custom max-w-4xl">
            <AnimatedSection>
              <h2 className="section-title">Education</h2>
            </AnimatedSection>

            <div className="space-y-6 mt-12">
              {education.map((edu, index) => (
                <AnimatedSection key={index}>
                  <div className="card">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                          <FiBook size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-dark-900 mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">{edu.school}</p>
                        <p className="text-dark-600 text-sm mb-3">{edu.period}</p>
                        <p className="text-dark-700">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-dark-50">
          <div className="container-custom max-w-4xl">
            <AnimatedSection>
              <h2 className="section-title">Work Experience</h2>
            </AnimatedSection>

            <div className="space-y-6 mt-12">
              {experience.map((exp, index) => (
                <AnimatedSection key={index}>
                  <div className="card">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                          <FiBriefcase size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-dark-900 mb-1">
                          {exp.position}
                        </h3>
                        <p className="text-primary-600 font-medium mb-2">{exp.company}</p>
                        <p className="text-dark-600 text-sm mb-4">{exp.period}</p>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex gap-2 text-dark-700">
                              <span className="text-primary-600 mt-1">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-white">
          <div className="container-custom max-w-4xl">
            <AnimatedSection>
              <h2 className="section-title">Certifications & Achievements</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {certifications.map((cert, index) => (
                <AnimatedSection key={index}>
                  <div className="card h-full">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                          <FiAward size={24} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-dark-900 mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-primary-600 text-sm font-medium mb-2">{cert.issuer}</p>
                        <p className="text-dark-600 text-sm mb-3">{cert.date}</p>
                        {cert.credentialUrl && cert.credentialUrl !== '#' && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View Credential →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
