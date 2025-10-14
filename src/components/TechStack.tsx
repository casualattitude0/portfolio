'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { TechStack } from '@/types/portfolio';

interface TechStackProps {
  techStack: TechStack[];
}

export function TechStack({ techStack }: TechStackProps) {
  const t = useTranslations('techStack');

  // Duplicate the tech stack for seamless loop
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center"
        >
          {t('title')}
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          animate={{
            x: [0, -50 * techStack.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {duplicatedStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              style={{ minWidth: '200px' }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <span className="font-semibold text-lg">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

