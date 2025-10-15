'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      // Instant jump
      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto'
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight"
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {tHero('name')}
          </motion.button>

          {/* Navigation - Desktop */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
          >
            <NavButton onClick={() => scrollToSection('about')}>
              {t('about')}
            </NavButton>
            <NavButton onClick={() => scrollToSection('projects')}>
              {t('projects')}
            </NavButton>
            <NavButton onClick={() => scrollToSection('experience')}>
              {t('experience')}
            </NavButton>
            <NavButton onClick={() => scrollToSection('contact')}>
              {t('contact')}
            </NavButton>
          </motion.nav>

          {/* Social Links & Controls */}
          <div className="flex items-center gap-2">
            <motion.div 
              className="hidden sm:flex items-center gap-1 mr-2"
            >
              <a
                href="https://github.com/casualattitude0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/aaron-xue-1b865322a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:casualattitude0@gmail.com"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </motion.div>
            
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isScrolled && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="px-4 py-2 space-y-1">
            <MobileNavButton onClick={() => scrollToSection('about')}>
              {t('about')}
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('projects')}>
              {t('projects')}
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('experience')}>
              {t('experience')}
            </MobileNavButton>
            <MobileNavButton onClick={() => scrollToSection('contact')}>
              {t('contact')}
            </MobileNavButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
    >
      {children}
    </button>
  );
}

function MobileNavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
    >
      {children}
    </button>
  );
}
