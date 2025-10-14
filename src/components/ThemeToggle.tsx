'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Force initial theme to light if not set
    if (!theme) {
      setTheme('light');
    }
  }, [setTheme, theme]);

  // Debug: Log theme changes
  useEffect(() => {
    if (mounted) {
      console.log('Current theme:', theme);
      console.log('HTML classes:', document.documentElement.className);
      
      // Force sync HTML class with theme state
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else if (theme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        console.log('Switching to theme:', newTheme);
        setTheme(newTheme);
      }}
      className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}

