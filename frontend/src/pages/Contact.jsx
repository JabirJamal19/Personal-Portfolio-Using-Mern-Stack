import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import AnimatedSection from '../components/common/AnimatedSection';
import { contactAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { profileData } from '../data/profileData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Get In Touch</title>
        <meta name="description" content="Get in touch with me for project collaborations or inquiries" />
      </Helmet>

      <div className="pt-24 pb-20 bg-dark-50 min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="section-title">Get In Touch</h1>
              <p className="section-subtitle mx-auto">
                Have a question or want to work together? I'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <AnimatedSection className="lg:col-span-1">
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                      <FiMail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${profileData.contact.email}`}
                        className="text-dark-600 hover:text-primary-600"
                      >
                        {profileData.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                      <FiPhone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900 mb-1">Phone</h3>
                      <a
                        href={`tel:${profileData.contact.phone}`}
                        className="text-dark-600 hover:text-primary-600"
                      >
                        {profileData.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                      <FiMapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-900 mb-1">Location</h3>
                      <p className="text-dark-600">{profileData.contact.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="card"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-dark-700 font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-dark-700 font-medium mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-dark-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-dark-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input-field resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
