import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiFolder, FiFileText, FiLogOut, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const cards = [
    {
      title: 'Manage Projects',
      description: 'Add, edit, or delete your projects',
      icon: <FiFolder size={32} />,
      link: '/admin/projects',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Manage Blogs',
      description: 'Create and manage blog posts',
      icon: <FiFileText size={32} />,
      link: '/admin/blogs',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Portfolio</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-dark-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-dark-200">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-heading font-bold text-dark-900">
                  Admin Dashboard
                </h1>
                <p className="text-dark-600 text-sm mt-1">
                  Welcome back, {user.name || 'Admin'}!
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-outline flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={card.link}>
                  <div className="card group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-dark-900 mb-2">
                      {card.title}
                    </h2>
                    <p className="text-dark-600 mb-4">{card.description}</p>
                    <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                      <span>Manage</span>
                      <FiPlus className="group-hover:rotate-90 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
