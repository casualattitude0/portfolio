import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { TechStack } from '@/components/TechStack';
import { Footer } from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <Hero />
      <About />
      <Projects projects={portfolioData.projects} />
      <Experience experience={portfolioData.experience} />
      <TechStack techStack={portfolioData.techStack} />
      <Footer />
    </div>
  );
}

