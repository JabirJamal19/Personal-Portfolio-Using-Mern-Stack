import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/JabirJamal19', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/jabirjamal22/', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://x.com/JabirJamal922', label: 'Twitter' },
    { icon: <FiMail />, url: 'mailto:jabirjamal922@gmail.com', label: 'Email' },
  ];
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-dark-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="Portfolio Logo" className="w-12 h-12" />
              <h3 className="text-2xl font-heading font-bold gradient-text">
                Portfolio
              </h3>
            </div>
            <p className="text-dark-400">
              Junior MERN Stack Developer passionate about creating innovative web solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-dark-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-800 pt-8 text-center text-dark-400">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
