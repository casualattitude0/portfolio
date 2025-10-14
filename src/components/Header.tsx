'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, Sparkles } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Transform values with spring physics for smooth motion
  const rawHeaderOpacity = useTransform(scrollY, [200, 400], [0, 1]);
  const headerOpacity = useSpring(rawHeaderOpacity, { stiffness: 100, damping: 20 });
  
  const rawHeaderY = useTransform(scrollY, [200, 400], [-80, 0]);
  const headerY = useSpring(rawHeaderY, { stiffness: 100, damping: 20 });
  
  const navOpacity = useTransform(scrollY, [300, 450], [0, 1]);
  const headerScale = useTransform(scrollY, [200, 400], [0.9, 1]);

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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      style={{ 
        opacity: headerOpacity,
        y: headerY,
        scale: headerScale,
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-2xl"
    >
      {/* Glowing top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        style={{
          opacity: headerOpacity,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand with sparkle effect */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Sparkle icon */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <div className="relative">
              <motion.div 
                className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                }}
              >
                Casual Attitude
              </motion.div>
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 blur-xl bg-blue-500/0 group-hover:bg-blue-500/30 -z-10 transition-all duration-300"
              />
              
              <motion.div 
                className="text-xs text-gray-500 dark:text-gray-400 absolute -bottom-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold"
              >
                {tHero('name')}
              </motion.div>
            </div>
          </motion.button>

          {/* Navigation - Desktop */}
          <motion.nav 
            style={{ opacity: navOpacity }}
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
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
              style={{ opacity: navOpacity }}
              className="hidden sm:flex items-center gap-1 mr-2"
            >
              <a
                href="https://github.com/casualattitude0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/aaron-xue-1b865322a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:casualattitude0@gmail.com"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
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
    <motion.button
      onClick={onClick}
      className="relative px-3 lg:px-4 py-2 rounded-xl text-sm font-bold overflow-hidden group"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Gradient underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 dark:from-blue-400/0 dark:via-purple-400/0 dark:to-pink-400/0 opacity-0 group-hover:opacity-10 rounded-xl"
        initial={false}
      />
    </motion.button>
  );
}

function MobileNavButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </button>
  );
}

