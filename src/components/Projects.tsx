'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');

  // Sort projects by year (descending)
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          {t('title')}
        </motion.h2>

        <div className="space-y-12">
          {sortedProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                        {project.role}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                        {project.clientOrCompany}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label={t('viewLive')}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label={t('viewRepo')}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.links.video && (
                      <a
                        href={project.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label={t('watchVideo')}
                      >
                        <Play className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {project.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {t('context')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.context}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {t('approach')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.approach}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {t('outcome')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">
                    {project.outcome.metric}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.outcome.details}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

