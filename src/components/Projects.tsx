'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { useState, useMemo } from 'react';

interface ProjectsProps {
  projects: Project[];
}

type SortMethod = 'latest' | 'oldest' | 'tech';

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');
  const [sortMethod, setSortMethod] = useState<SortMethod>('latest');
  const [selectedTech, setSelectedTech] = useState<string>('all');

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
      filtered = filtered.filter((project) =>
        project.techs?.includes(selectedTech)
      );
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

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
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
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project, index) => {
            const displayYear =
              typeof project.year === 'string'
                ? project.year
                : project.year.toString();

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {displayYear}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      {project.clientOrCompany}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.role}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.techs && project.techs.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techs.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techs.length > 6 && (
                        <span className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded-full">
                          +{project.techs.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-light">
                  {project.summary}
                </p>

                {/* Outcome */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {project.outcome.metric}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                    {project.outcome.details}
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
              </motion.article>
            );
          })}
        </div>

        {/* No results */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 dark:text-gray-500">
              {t('noProjects')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
