import AnimatedSection from '../common/AnimatedSection';
import { skills } from '../../data/profileData';
import { motion } from 'framer-motion';

const SkillBar = ({ name, level, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium text-dark-800">{name}</span>
        <span className="text-dark-600">{level}%</span>
      </div>
      <div className="w-full bg-dark-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-dark-50">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle mx-auto">
              Technologies and tools I work with
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <AnimatedSection className="card">
            <h3 className="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
              <span className="text-primary-600">💻</span> Frontend
            </h3>
            {skills.frontend.map((skill, index) => (
              <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </AnimatedSection>

          {/* Backend Skills */}
          <AnimatedSection className="card">
            <h3 className="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
              <span className="text-primary-600">⚙️</span> Backend
            </h3>
            {skills.backend.map((skill, index) => (
              <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </AnimatedSection>

          {/* Tools & Others */}
          <AnimatedSection className="card">
            <h3 className="text-xl font-heading font-bold text-dark-900 mb-6 flex items-center gap-2">
              <span className="text-primary-600">🛠️</span> Tools & Others
            </h3>
            {skills.tools.map((skill, index) => (
              <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;
