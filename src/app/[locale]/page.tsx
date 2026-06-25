import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { TechStack } from '@/components/TechStack';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import type { Project, Experience as ExperienceType, TechStack as TechStackType } from '@/types/portfolio';

import portfolioDataEn from '@/data/portfolio.en.json';
import portfolioDataJa from '@/data/portfolio.ja.json';
import portfolioDataTw from '@/data/portfolio.tw.json';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const portfolioData = locale === 'ja' 
    ? portfolioDataJa 
    : locale === 'tw' 
    ? portfolioDataTw 
    : portfolioDataEn;

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ScrollProgress />
      <Header />
      <Hero />
      <Stats />
      <TechStack techStack={portfolioData.techStack as TechStackType[]} />
      <Projects projects={portfolioData.projects as Project[]} />
      <Experience experience={portfolioData.experience as ExperienceType[]} />
      <Footer />
    </div>
  );
}

