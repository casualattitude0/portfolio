'use client';

import { useTranslations } from 'next-intl';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { TechStack } from '@/types/portfolio';
import { IconType } from 'react-icons';
import {
  SiUnity,
  SiSharp,
  SiFlutter,
  SiTypescript,
  SiVuedotjs,
  SiGooglecloud,
  SiFirebase,
  SiFastlane,
  SiDiscord,
  SiGit,
  SiFigma,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiAndroid,
  SiApple,
  SiSteam,
  SiMongodb,
  SiPostgresql,
  SiNginx,
  SiGithubactions,
  SiJest,
  SiBlender,
  SiAdobephotoshop,
  SiNotion,
  SiSlack,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandReactNative, TbDeviceDesktopAnalytics } from 'react-icons/tb';

interface TechStackProps {
  techStack: TechStack[];
}

// Icon mapping for tech stack items
const iconMap: Record<string, IconType> = {
  'unity': SiUnity,
  'csharp': SiSharp,
  'c#': SiSharp,
  'flutter': SiFlutter,
  'typescript': SiTypescript,
  'vue': SiVuedotjs,
  'vuejs': SiVuedotjs,
  'vue.js': SiVuedotjs,
  'gcp': SiGooglecloud,
  'google cloud platform': SiGooglecloud,
  'googlecloud': SiGooglecloud,
  'firebase': SiFirebase,
  'fastlane': SiFastlane,
  'discord': SiDiscord,
  'discordjs': SiDiscord,
  'discord.js': SiDiscord,
  'cicd': TbDeviceDesktopAnalytics,
  'ci/cd': TbDeviceDesktopAnalytics,
  'git': SiGit,
  'figma': SiFigma,
  'python': SiPython,
  'cpp': SiCplusplus,
  'c++': SiCplusplus,
  'react': SiReact,
  'reactnative': TbBrandReactNative,
  'react native': TbBrandReactNative,
  'nextjs': SiNextdotjs,
  'next.js': SiNextdotjs,
  'javascript': SiJavascript,
  'js': SiJavascript,
  'nodejs': SiNodedotjs,
  'node.js': SiNodedotjs,
  'docker': SiDocker,
  'kubernetes': SiKubernetes,
  'k8s': SiKubernetes,
  'android': SiAndroid,
  'ios': SiApple,
  'apple': SiApple,
  'steam': SiSteam,
  'mongodb': SiMongodb,
  'postgresql': SiPostgresql,
  'postgres': SiPostgresql,
  'nginx': SiNginx,
  'githubactions': SiGithubactions,
  'github actions': SiGithubactions,
  'jest': SiJest,
  'blender': SiBlender,
  'photoshop': SiAdobephotoshop,
  'notion': SiNotion,
  'slack': SiSlack,
  'tailwindcss': SiTailwindcss,
  'tailwind': SiTailwindcss,
};

// Get icon component based on tech name or icon identifier
function getIconComponent(tech: TechStack): IconType | null {
  // Try to match by icon field first (if it's an identifier)
  const iconKey = tech.icon?.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (iconKey && iconMap[iconKey]) {
    return iconMap[iconKey];
  }
  
  // Fallback to matching by name
  const nameKey = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return iconMap[nameKey] || null;
}

// Enhanced tech stack with more technologies
const enhancedTechStack = [
  // Game Development & Core Languages
  { name: 'Unity', icon: 'unity', category: 'game' },
  { name: 'C#', icon: 'csharp', category: 'language' },
  { name: 'C++', icon: 'cpp', category: 'language' },
  { name: 'Python', icon: 'python', category: 'language' },
  { name: 'TypeScript', icon: 'typescript', category: 'language' },
  { name: 'JavaScript', icon: 'javascript', category: 'language' },
  
  // Mobile & Web Frameworks
  { name: 'Flutter', icon: 'flutter', category: 'mobile' },
  { name: 'React', icon: 'react', category: 'web' },
  { name: 'Next.js', icon: 'nextjs', category: 'web' },
  { name: 'Vue.js', icon: 'vuejs', category: 'web' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Tailwind', icon: 'tailwindcss', category: 'web' },
  
  // Cloud & DevOps
  { name: 'GCP', icon: 'gcp', category: 'cloud' },
  { name: 'Firebase', icon: 'firebase', category: 'cloud' },
  { name: 'Docker', icon: 'docker', category: 'devops' },
  { name: 'CI/CD', icon: 'cicd', category: 'devops' },
  { name: 'Fastlane', icon: 'fastlane', category: 'devops' },
  { name: 'GitHub Actions', icon: 'githubactions', category: 'devops' },
  
  // Tools & Platforms
  { name: 'Git', icon: 'git', category: 'tool' },
  { name: 'Figma', icon: 'figma', category: 'design' },
  { name: 'Photoshop', icon: 'photoshop', category: 'design' },
  { name: 'Blender', icon: 'blender', category: 'design' },
  { name: 'Notion', icon: 'notion', category: 'tool' },
  { name: 'Slack', icon: 'slack', category: 'tool' },
  
  // Databases
  { name: 'MongoDB', icon: 'mongodb', category: 'database' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database' },
  
  // Platform specific
  { name: 'Android', icon: 'android', category: 'platform' },
  { name: 'iOS', icon: 'ios', category: 'platform' },
  { name: 'Steam', icon: 'steam', category: 'platform' },
  { name: 'Discord', icon: 'discord', category: 'platform' },
];

// Split into rows
const createRows = () => {
  const itemsPerRow = Math.ceil(enhancedTechStack.length / 3);
  return [
    enhancedTechStack.slice(0, itemsPerRow),
    enhancedTechStack.slice(itemsPerRow, itemsPerRow * 2),
    enhancedTechStack.slice(itemsPerRow * 2),
  ];
};

interface MarqueeRowProps {
  items: Array<{ name: string; icon: string; category: string }>;
  direction?: 'left' | 'right';
  duration?: number;
}

function MarqueeRow({ items, direction = 'left', duration = 40 }: MarqueeRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const controls = useAnimation();
  
  // Triple the items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];
  const itemSpacing = 60;
  const totalWidth = itemSpacing * items.length;

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: direction === 'left' ? [0, -totalWidth] : [-totalWidth, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        },
      });
    }
  }, [isHovered, controls, direction, totalWidth, duration]);

  return (
    <div 
      className="relative overflow-hidden py-4"
      onMouseEnter={() => {
        setIsHovered(true);
        controls.stop();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredItem(null);
      }}
    >
      <motion.div
        animate={controls}
        className="flex items-center gap-12 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {duplicatedItems.map((item, index) => {
          const IconComponent = getIconComponent({ name: item.name, icon: item.icon });
          const isItemHovered = hoveredItem === item.name;
          
          return (
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isItemHovered ? 1.1 : 1,
                filter: isItemHovered ? "brightness(1.2)" : "brightness(1)",
              }}
              transition={{ 
                opacity: { delay: index * 0.05 },
                y: { delay: index * 0.05, type: "spring", stiffness: 100 },
                scale: { duration: 0.2, ease: "easeOut" },
                filter: { duration: 0.2 }
              }}
              whileHover={{ 
                scale: 1.15,
                y: -8,
                transition: { 
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex items-center gap-3 cursor-pointer relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg blur-xl"
                animate={{
                  opacity: isItemHovered ? 0.3 : 0,
                  scale: isItemHovered ? 1.2 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(45deg, ${getCategoryColor(item.category)}, transparent)`,
                }}
              />
              
              {/* Icon with enhanced effects */}
              <motion.div 
                className="flex-shrink-0 relative z-10"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.2,
                  transition: { 
                    duration: 0.6,
                    ease: "easeInOut"
                  }
                }}
                animate={{
                  rotate: isItemHovered ? [0, 5, -5, 5, 0] : 0,
                }}
                transition={{
                  rotate: { duration: 2, repeat: isItemHovered ? Infinity : 0 }
                }}
              >
                {IconComponent ? (
                  <motion.div
                    animate={{
                      filter: isItemHovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.5))" : "none"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                ) : (
                  <span className="text-3xl">💻</span>
                )}
              </motion.div>
              
              {/* Name with typing effect */}
              <motion.div 
                className="flex-shrink-0 relative z-10"
                animate={{
                  color: isItemHovered ? getCategoryColor(item.category) : "white",
                  textShadow: isItemHovered ? "0 0 10px rgba(255,255,255,0.8)" : "none"
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// Color mapping for categories
function getCategoryColor(category: string): string {
  const colors = {
    game: '#FF6B6B',
    language: '#4ECDC4', 
    mobile: '#45B7D1',
    web: '#96CEB4',
    backend: '#FFEAA7',
    cloud: '#DDA0DD',
    devops: '#98D8C8',
    tool: '#F7DC6F',
    design: '#BB8FCE',
    database: '#85C1E9',
    platform: '#F8C471'
  };
  return colors[category as keyof typeof colors] || '#FFFFFF';
}

export function TechStack({ techStack }: TechStackProps) {
  const t = useTranslations('techStack');
  const rows = createRows();
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    x: number[];
    y: number[];
    duration: number;
    delay: number;
    left: string;
    top: string;
  }>>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate particles only on client side
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      <div className="container mx-auto max-w-6xl mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {t('title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Technologies & Tools I Work With
          </motion.p>

          {/* Floating particles - only render on client */}
          {isMounted && (
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: particle.delay,
                  }}
                  style={{
                    left: particle.left,
                    top: particle.top,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Enhanced fade gradients */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 z-20 pointer-events-none"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 z-20 pointer-events-none"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Multiple marquee rows with staggered timing */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <MarqueeRow items={rows[0]} direction="left" duration={55} />
          <MarqueeRow items={rows[1]} direction="right" duration={50} />
          <MarqueeRow items={rows[2]} direction="left" duration={60} />
        </motion.div>
      </div>
    </section>
  );
}

