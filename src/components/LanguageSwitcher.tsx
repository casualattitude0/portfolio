'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'tw', label: '繁中' },
  { code: 'ja', label: '日本語' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Languages className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-sm font-medium">
          {languages.find((l) => l.code === currentLocale)?.label}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => router.push(pathname, { locale: lang.code as any })}
            className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              currentLocale === lang.code
                ? 'bg-gray-100 dark:bg-gray-700 font-semibold'
                : ''
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}

