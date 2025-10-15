'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      {/* Top Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-6 right-6 flex items-center gap-3 z-10"
      >
        <ThemeToggle />
        <LanguageSwitcher />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-500 dark:text-gray-400 mb-2 font-normal"
        >
          {t('greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl lg:text-8xl font-semibold mb-3 text-gray-900 dark:text-white tracking-tight"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 mb-2 font-normal"
        >
          {t('handle')}
        </motion.p>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-normal"
        >
          {t('title')}
        </motion.h2>

        {/* Headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed max-w-2xl mx-auto font-light"
        >
          {t('headline')}
        </motion.p>

        {/* Value Prop */}
        <motion.p
          variants={itemVariants}
          className="text-base text-gray-500 dark:text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
        >
          {t('valueProp')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-normal hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors duration-200"
          >
            {t('cta.contact')}
          </a>
          
          <a
            href="#about"
            className="px-8 py-3 rounded-xl font-normal border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
          >
            {t('cta.resume')}
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3"
        >
          {[
            { href: "https://github.com/casualattitude0", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/aaron-xue-1b865322a/", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:casualattitude0@gmail.com", icon: Mail, label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? "_blank" : undefined}
              rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-400 dark:text-gray-500">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
