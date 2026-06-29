import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="relative flex items-center p-1 bg-gray-100 dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full select-none">
      {/* Dark Theme Button */}
      <button
        onClick={() => toggleTheme('dark')}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
          isDark ? 'text-white' : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <Moon size={13} className={isDark ? 'fill-current text-white' : ''} />
        <span>Dark</span>
        {isDark && (
          <motion.div
            layoutId="activeTheme"
            className="absolute inset-0 bg-brand-purple rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      {/* Light Theme Button */}
      <button
        onClick={() => toggleTheme('light')}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
          !isDark ? 'text-white' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Sun size={13} className={!isDark ? 'fill-current text-white' : ''} />
        <span>Light</span>
        {!isDark && (
          <motion.div
            layoutId="activeTheme"
            className="absolute inset-0 bg-brand-purple rounded-full -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
