import Hero from '../components/home/Hero';
import About from '../components/home/About';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Skills from '../components/home/Skills';
import RecentBlogs from '../components/home/RecentBlogs';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <RecentBlogs />
      <CallToAction />
    </div>
  );
};

export default Home;
