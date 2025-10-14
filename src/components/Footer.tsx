'use client';

import { useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');

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
      value: '249172824986484737',
      href: 'https://discord.com/users/249172824986484737',
    },
  ];

  return (
    <footer id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors group"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-blue-600 rounded-full group-hover:bg-blue-500 transition-colors">
                  <contact.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{contact.label}</p>
                  <p className="font-semibold text-white break-all">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-gray-400 mb-2">{tFooter('copyright')}</p>
          <p className="text-gray-500">{tFooter('madeWith')}</p>
        </motion.div>
      </div>
    </footer>
  );
}

