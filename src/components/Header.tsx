'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl"
              >
                Casual Attitude
              </motion.div>

              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t('about')}
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t('projects')}
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t('experience')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t('contact')}
                </button>
              </nav>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

