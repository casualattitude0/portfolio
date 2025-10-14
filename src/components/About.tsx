'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Zap, Users, Rocket, RefreshCw } from 'lucide-react';

export function About() {
  const t = useTranslations('about');

  const processSteps = [
    { key: 'concept', icon: Target },
    { key: 'prototype', icon: Zap },
    { key: 'collaborate', icon: Users },
    { key: 'deploy', icon: Rocket },
    { key: 'reflect', icon: RefreshCw },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center">
            {t('title')}
          </h2>

          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{t('bio')}</p>
            <p>{t('journey')}</p>
            <p>{t('current')}</p>
            <p>{t('passion')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            {t('process.title')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">
                      {t(`process.${key}.title`)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(`process.${key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{t('education.title')}</h3>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {t('education.degree')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              {t('education.school')}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {t('education.year')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{t('languages.title')}</h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  English:
                </span>{' '}
                <span className="text-gray-600 dark:text-gray-400">
                  {t('languages.english')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Mandarin:
                </span>{' '}
                <span className="text-gray-600 dark:text-gray-400">
                  {t('languages.mandarin')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Japanese:
                </span>{' '}
                <span className="text-gray-600 dark:text-gray-400">
                  {t('languages.japanese')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

