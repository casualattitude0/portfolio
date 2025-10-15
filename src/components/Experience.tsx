'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import type { Experience } from '@/types/portfolio';

interface ExperienceProps {
  experience: Experience[];
}

export function Experience({ experience }: ExperienceProps) {
  const t = useTranslations('experience');

  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl font-semibold mb-20 text-center text-gray-900 dark:text-white tracking-tight"
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-[30px] top-2 w-3 h-3 bg-gray-900 dark:bg-white rounded-full border-2 border-white dark:border-black" />

                <div className="p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                      <Briefcase className="w-4 h-4 text-gray-900 dark:text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-lg text-gray-900 dark:text-white font-normal">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                    {exp.period}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
