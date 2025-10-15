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
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold mb-12 text-center text-gray-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>

          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
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
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <h3 className="text-3xl font-semibold mb-12 text-center text-gray-900 dark:text-white tracking-tight">
            {t('process.title')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                    <Icon className="w-5 h-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1.5 text-gray-900 dark:text-white">
                      {t(`process.${key}.title`)}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
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
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('education.title')}</h3>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('education.degree')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              {t('education.school')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {t('education.year')}
            </p>
          </div>

          <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{t('languages.title')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t('languages.englishLabel')}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
                  {t('languages.english')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t('languages.mandarinLabel')}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
                  {t('languages.mandarin')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {t('languages.japaneseLabel')}
                </span>
                <span className="text-gray-500 dark:text-gray-500">
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
