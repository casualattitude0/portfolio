'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Hero() {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2"
        >
          {t('greeting')}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300"
        >
          {t('handle')}
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
        >
          {t('headline')}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          {t('valueProp')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            {t('cta.contact')}
          </a>
          <a
            href="#about"
            className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg font-semibold transition-colors"
          >
            {t('cta.resume')}
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/casualattitude0"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/aaron-xue-1b865322a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:casualattitude0@gmail.com"
            className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

