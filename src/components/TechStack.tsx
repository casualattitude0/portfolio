'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
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

function getIconComponent(tech: TechStack): IconType | null {
  const iconKey = tech.icon?.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (iconKey && iconMap[iconKey]) {
    return iconMap[iconKey];
  }
  
  const nameKey = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return iconMap[nameKey] || null;
}

const enhancedTechStack = [
  { name: 'Unity', icon: 'unity', category: 'game' },
  { name: 'C#', icon: 'csharp', category: 'language' },
  { name: 'C++', icon: 'cpp', category: 'language' },
  { name: 'Python', icon: 'python', category: 'language' },
  { name: 'TypeScript', icon: 'typescript', category: 'language' },
  { name: 'JavaScript', icon: 'javascript', category: 'language' },
  { name: 'Flutter', icon: 'flutter', category: 'mobile' },
  { name: 'React', icon: 'react', category: 'web' },
  { name: 'Next.js', icon: 'nextjs', category: 'web' },
  { name: 'Vue.js', icon: 'vuejs', category: 'web' },
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Tailwind', icon: 'tailwindcss', category: 'web' },
  { name: 'GCP', icon: 'gcp', category: 'cloud' },
  { name: 'Firebase', icon: 'firebase', category: 'cloud' },
  { name: 'Docker', icon: 'docker', category: 'devops' },
  { name: 'Git', icon: 'git', category: 'tool' },
  { name: 'Figma', icon: 'figma', category: 'design' },
  { name: 'MongoDB', icon: 'mongodb', category: 'database' },
];

export function TechStack({ }: TechStackProps) {
  const t = useTranslations('techStack');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold mb-4 text-gray-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          
          <p className="text-gray-500 dark:text-gray-500 text-lg font-light">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {enhancedTechStack.map((item, index) => {
            const IconComponent = getIconComponent({ name: item.name, icon: item.icon });
            
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-900 transition-colors duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 text-gray-900 dark:text-white" />
                  ) : (
                    <span className="text-2xl">💻</span>
                  )}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
