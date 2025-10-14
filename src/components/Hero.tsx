'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, ChevronDown, Sparkles, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Parallax and scroll-based transforms with more drama
  const heroY = useTransform(scrollY, [0, 500], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroRotate = useTransform(scrollY, [0, 500], [0, -5]);
  
  // 3D perspective effect
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // Generate floating particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500/30 dark:bg-blue-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs with enhanced animation */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/30 to-blue-600/30 rounded-full blur-3xl"
        />
        
        {/* Spotlight effect following mouse */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            x: mouseX,
            y: mouseY,
          }}
        />
      </div>

      {/* Top Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-6 flex items-center gap-3 z-10"
      >
        <ThemeToggle />
        <LanguageSwitcher />
      </motion.div>

      {/* Main Content with 3D Transform */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-12 h-12 text-blue-500/50 dark:text-blue-400/50" />
        </motion.div>

        {/* Greeting with glow */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-3 font-medium relative inline-block"
        >
          <span className="relative z-10">{t('greeting')}</span>
          <motion.span
            className="absolute inset-0 blur-xl bg-blue-500/20 -z-10"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.p>

        {/* Name with 3D effect and glow */}
        <motion.div className="mb-6 relative">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="text-7xl sm:text-8xl lg:text-9xl font-black mb-4 relative cursor-default"
            style={{
              textShadow: '0 0 80px rgba(59, 130, 246, 0.5)',
            }}
          >
            <span className="relative inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient bg-size-200">
              {t('name')}
            </span>
            
            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Sparkle effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3 + 1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Zap className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent"
          >
            {t('handle')}
          </motion.p>
        </motion.div>

        {/* Title with animated border */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="relative inline-block mb-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-semibold px-6 py-3 relative z-10">
            {t('title')}
          </h2>
          <motion.div
            className="absolute inset-0 border-2 border-blue-500/50 dark:border-blue-400/50 rounded-2xl"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto"
        >
          {t('headline')}
        </motion.p>

        {/* Value Prop */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto"
        >
          {t('valueProp')}
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 text-white rounded-2xl font-bold overflow-hidden"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2">
              {t('cta.contact')}
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </motion.a>
          
          <motion.a
            href="#about"
            className="relative px-8 py-4 rounded-2xl font-bold overflow-hidden group"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{t('cta.resume')}</span>
            <div className="absolute inset-0 border-2 border-blue-600 dark:border-blue-400 rounded-2xl" />
            <motion.div
              className="absolute inset-0 bg-blue-600 dark:bg-blue-400"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>

        {/* Social Links with orbital animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex items-center justify-center gap-2"
        >
          {[
            { href: "https://github.com/casualattitude0", icon: Github, label: "GitHub", color: "from-gray-700 to-gray-900" },
            { href: "https://www.linkedin.com/in/aaron-xue-1b865322a/", icon: Linkedin, label: "LinkedIn", color: "from-blue-600 to-blue-800" },
            { href: "mailto:casualattitude0@gmail.com", icon: Mail, label: "Email", color: "from-purple-600 to-pink-600" },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? "_blank" : undefined}
              rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className="relative group p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                y: -10,
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
              
              {/* Hover gradient background */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                initial={false}
              />
              
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.color} blur-xl opacity-0 group-hover:opacity-50`}
                initial={false}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { delay: 2 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Explore More
          </span>
          <motion.div 
            className="w-8 h-12 border-2 border-gray-400 dark:border-gray-600 group-hover:border-blue-600 dark:group-hover:border-blue-400 rounded-full flex justify-center p-2 relative overflow-hidden transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-600 dark:border-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
          <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </motion.div>
    </section>
  );
}

