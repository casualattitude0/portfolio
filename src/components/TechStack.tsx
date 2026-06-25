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
  SiFastapi,
  SiLangchain,
  SiGo,
  SiSwift,
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
  'swift': SiSwift,
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
  'go': SiGo,
  'golang': SiGo,
  'fastapi': SiFastapi,
  'langchain': SiLangchain,
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

// Grouped into the six display categories shown on the Skills section.
// `group` keys map to messages: techStack.categories.*
const CATEGORY_ORDER = ['language', 'frontend', 'backend', 'mobile', 'cloud', 'tool'] as const;
type CategoryKey = (typeof CATEGORY_ORDER)[number];

const enhancedTechStack: { name: string; icon: string; group: CategoryKey }[] = [
  // Languages
  { name: 'TypeScript', icon: 'typescript', group: 'language' },
  { name: 'JavaScript', icon: 'javascript', group: 'language' },
  { name: 'Python', icon: 'python', group: 'language' },
  { name: 'Go', icon: 'go', group: 'language' },
  { name: 'C#', icon: 'csharp', group: 'language' },
  { name: 'C++', icon: 'cpp', group: 'language' },
  // Frontend
  { name: 'React', icon: 'react', group: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', group: 'frontend' },
  { name: 'Vue.js', icon: 'vuejs', group: 'frontend' },
  { name: 'Tailwind', icon: 'tailwindcss', group: 'frontend' },
  // Backend
  { name: 'Node.js', icon: 'nodejs', group: 'backend' },
  { name: 'FastAPI', icon: 'fastapi', group: 'backend' },
  { name: 'LangChain', icon: 'langchain', group: 'backend' },
  { name: 'MongoDB', icon: 'mongodb', group: 'backend' },
  // Mobile
  { name: 'Flutter', icon: 'flutter', group: 'mobile' },
  { name: 'Unity', icon: 'unity', group: 'mobile' },
  // Cloud & DevOps
  { name: 'GCP', icon: 'gcp', group: 'cloud' },
  { name: 'Firebase', icon: 'firebase', group: 'cloud' },
  { name: 'Docker', icon: 'docker', group: 'cloud' },
  // Tools
  { name: 'Git', icon: 'git', group: 'tool' },
  { name: 'Figma', icon: 'figma', group: 'tool' },
];

export function TechStack({ }: TechStackProps) {
  const t = useTranslations('techStack');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
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

        <div className="space-y-12">
          {CATEGORY_ORDER.map((group) => {
            const items = enhancedTechStack.filter((item) => item.group === group);
            if (items.length === 0) return null;

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8 items-start"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white md:text-right md:pt-4">
                  {t(`categories.${group}`)}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {items.map((item, index) => {
                    const IconComponent = getIconComponent({ name: item.name, icon: item.icon });

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          {IconComponent ? (
                            <IconComponent className="w-5 h-5 text-gray-900 dark:text-white" />
                          ) : (
                            <span className="text-lg">💻</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-normal whitespace-nowrap">
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
