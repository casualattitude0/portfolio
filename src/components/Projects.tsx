'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, ArrowUpDown, Calendar, Code2, Filter, Grid, List } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import { useState, useMemo } from 'react';

interface ProjectsProps {
  projects: Project[];
}

type SortMethod = 'latest' | 'oldest' | 'tech';
type ViewMode = 'grid' | 'list';

export function Projects({ projects }: ProjectsProps) {
  const t = useTranslations('projects');
  const [sortMethod, setSortMethod] = useState<SortMethod>('latest');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Extract all unique technologies from projects
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techs?.forEach((tech) => techSet.add(tech));
    });
    return ['all', ...Array.from(techSet).sort()];
  }, [projects]);

  // Sort and filter projects
  const sortedProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by selected tech
    if (selectedTech !== 'all') {
      filtered = filtered.filter((project) =>
        project.techs?.includes(selectedTech)
      );
    }

    // Sort by method
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio of innovative projects spanning game development, web applications, and creative technologies.
          </p>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Left side - Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                Sort by:
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortMethod('latest')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                    sortMethod === 'latest'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={t('sortLatest')}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {t('sortLatest')}
                </button>
                <button
                  onClick={() => setSortMethod('oldest')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                    sortMethod === 'oldest'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={t('sortOldest')}
                >
                  <ArrowUpDown className="w-4 h-4 rotate-180" />
                  {t('sortOldest')}
                </button>
              </div>
            </div>

            {/* Center - Tech Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                aria-label={t('filterByTech')}
              >
                {allTechs.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech === 'all' ? t('allTechs') : tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Right side - View Mode */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 shadow-md'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 shadow-md'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-8'
        }>
          {sortedProjects.map((project, index) => {
            const displayYear =
              typeof project.year === 'string'
                ? project.year
                : project.year.toString();

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  viewMode === 'list' ? 'flex flex-col lg:flex-row' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main Content */}
                <div className={`relative bg-white dark:bg-gray-800 ${viewMode === 'list' ? 'flex-1' : 'h-full'}`}>
                  {/* Header */}
                  <div className={`p-6 ${viewMode === 'list' ? 'lg:p-8' : ''}`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                            {displayYear}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {project.clientOrCompany}
                          </span>
                        </div>
                        
                        <h3 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                          viewMode === 'list' ? 'text-2xl lg:text-3xl' : 'text-xl'
                        }`}>
                          {project.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                            {project.role}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
                            aria-label={t('viewLive')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-md"
                            aria-label={t('viewRepo')}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.video && (
                          <a
                            href={project.links.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
                            aria-label={t('watchVideo')}
                          >
                            <Play className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    {project.techs && project.techs.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.techs.slice(0, viewMode === 'list' ? 8 : 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-blue-500/30 rounded-full text-blue-700 dark:text-blue-300 hover:scale-105 transition-transform"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techs.length > (viewMode === 'list' ? 8 : 4) && (
                            <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              +{project.techs.length - (viewMode === 'list' ? 8 : 4)} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <p className={`text-gray-600 dark:text-gray-400 mb-6 leading-relaxed ${
                      viewMode === 'list' ? 'text-lg' : 'text-sm'
                    }`}>
                      {project.summary}
                    </p>

                    {/* Details Grid (only in list view or expanded cards) */}
                    {viewMode === 'list' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            {t('context')}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {project.context}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            {t('approach')}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {project.approach}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Outcome */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 text-sm">
                        {t('outcome')}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1 text-sm">
                        {project.outcome.metric}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {project.outcome.details}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* No results message */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('noProjects')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}