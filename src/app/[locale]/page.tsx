import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { TechStack } from '@/components/TechStack';
import { Footer } from '@/components/Footer';
import type { Project, Experience as ExperienceType, TechStack as TechStackType } from '@/types/portfolio';

import portfolioDataEn from '@/data/portfolio.en.json';
import portfolioDataJa from '@/data/portfolio.ja.json';
import portfolioDataTw from '@/data/portfolio.tw.json';

interface PageProps {
  params: {
    locale: string;
  };
}

export default function Home({ params: { locale } }: PageProps) {
  const portfolioData = locale === 'ja' 
    ? portfolioDataJa 
    : locale === 'tw' 
    ? portfolioDataTw 
    : portfolioDataEn;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <Hero />
      <About />
      <Projects projects={portfolioData.projects as Project[]} />
      <Experience experience={portfolioData.experience as ExperienceType[]} />
      <TechStack techStack={portfolioData.techStack as TechStackType[]} />
      <Footer />
    </div>
  );
}

