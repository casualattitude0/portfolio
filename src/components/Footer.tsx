'use client';

import { useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('contact');

  const contacts = [
    {
      icon: Mail,
      label: t('email'),
      value: 'casualattitude0@gmail.com',
      href: 'mailto:casualattitude0@gmail.com',
    },
    {
      icon: Github,
      label: t('github'),
      value: 'casualattitude0',
      href: 'https://github.com/casualattitude0',
    },
    {
      icon: Linkedin,
      label: t('linkedin'),
      value: 'Aaron Xue',
      href: 'https://www.linkedin.com/in/aaron-xue-1b865322a/',
    },
    {
      icon: MessageCircle,
      label: t('discord'),
      value: 'Discord',
      href: 'https://discord.com/users/249172824986484737',
    },
  ];

  return (
    <footer id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl sm:text-6xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-light">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors duration-200">
                  <contact.icon className="w-5 h-5 text-gray-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                    {contact.label}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white break-all font-normal">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}

