'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

interface ProjectsProps {
  projects: Project[];
}

type SortMethod = 'latest' | 'oldest' | 'tech';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');
  const reduce = useReducedMotion();
  const [sortMethod, setSortMethod] = useState<SortMethod>('latest');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techs?.forEach((tech) => techSet.add(tech));
    });
    return ['all', ...Array.from(techSet).sort()];
  }, [projects]);

  const sortedProjects = useMemo(() => {
    let filtered = [...projects];

    if (selectedTech !== 'all') {
      filtered = filtered.filter((project) => project.techs?.includes(selectedTech));
    }

    if (sortMethod === 'latest') {
      filtered.sort((a, b) => {
        const yearA = typeof a.year === 'number' ? a.year : 9999;
        const yearB = typeof b.year === 'number' ? b.year : 9999;
        return yearB - yearA;
      });
    } else if (sortMethod === 'oldest') {
      filtered.sort((a, b) => {
        const yearA = typeof a.year === 'number' ? a.year : 9999;
        const yearB = typeof b.year === 'number' ? b.year : 9999;
        return yearA - yearB;
      });
    }

    return filtered;
  }, [projects, sortMethod, selectedTech]);

  // The horizontal pinned showcase is desktop-only and disabled under reduced motion.
  const usePinned = isMounted && isDesktop && !reduce;

  return (
    <section id="projects" className="bg-white dark:bg-black">
      <div className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl sm:text-6xl font-semibold mb-4 text-gray-900 dark:text-white tracking-tight">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-500 font-light max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between"
          >
            <div className="flex gap-2">
              <button
                onClick={() => setSortMethod('latest')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 ${
                  sortMethod === 'latest'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {t('sortLatest')}
              </button>
              <button
                onClick={() => setSortMethod('oldest')}
                className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 ${
                  sortMethod === 'oldest'
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {t('sortOldest')}
              </button>
            </div>

            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 border-0 text-sm transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {allTechs.map((tech) => (
                <option key={tech} value={tech}>
                  {tech === 'all' ? t('allTechs') : tech}
                </option>
              ))}
            </select>
          </motion.div>

          {usePinned && sortedProjects.length > 0 && (
            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mb-2">
              ↓ scroll to explore
            </p>
          )}
        </div>
      </div>

      {/* No results */}
      {sortedProjects.length === 0 ? (
        <div className="px-4 pb-32 text-center">
          <p className="text-gray-500 dark:text-gray-500">{t('noProjects')}</p>
        </div>
      ) : usePinned ? (
        <PinnedShowcase
          key={`${sortMethod}-${selectedTech}-${sortedProjects.length}`}
          projects={sortedProjects}
          t={t}
        />
      ) : (
        <div className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
              >
                <ProjectCard project={project} t={t} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/** Apple-style pinned scene: vertical scroll drives the project track horizontally. */
function PinnedShowcase({
  projects,
  t,
}: {
  projects: Project[];
  t: ReturnType<typeof useTranslations>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const d = Math.max(0, track.scrollWidth - window.innerWidth);
    setDistance(d);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, projects]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Read latest distance via a ref so the transform stays correct after re-measure.
  const distanceRef = useRef(0);
  distanceRef.current = distance;
  const x = useTransform(scrollYProgress, (v) => -distanceRef.current * v);

  return (
    <div ref={wrapperRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 px-[max(2rem,calc((100vw-72rem)/2))]"
        >
          {projects.map((project) => (
            <div key={project.title} className="w-[360px] sm:w-[400px] shrink-0">
              <ProjectCard project={project} t={t} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  t,
}: {
  project: Project;
  t: ReturnType<typeof useTranslations>;
}) {
  const displayYear =
    typeof project.year === 'string' ? project.year : project.year.toString();

  return (
    <article className="group h-full p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-500">{displayYear}</span>
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {project.clientOrCompany}
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{project.role}</p>
      </div>

      {/* Tech Stack */}
      {project.techs && project.techs.length > 0 && (
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {project.techs.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.techs.length > 4 && (
              <span className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded-full">
                +{project.techs.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed font-light line-clamp-3">
        {project.summary}
      </p>

      {/* Outcome — single highlighted line */}
      <div className="mb-5 mt-auto flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500" />
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {project.outcome.metric}
        </p>
      </div>

      {/* Links */}
      <div className="flex gap-2">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label={t('viewLive')}
          >
            <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
          </a>
        )}
        {project.links.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label={t('viewRepo')}
          >
            <Github className="w-4 h-4" strokeWidth={1.5} />
          </a>
        )}
        {project.links.video && (
          <a
            href={project.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label={t('watchVideo')}
          >
            <Play className="w-4 h-4" strokeWidth={1.5} />
          </a>
        )}
      </div>
    </article>
  );
}
