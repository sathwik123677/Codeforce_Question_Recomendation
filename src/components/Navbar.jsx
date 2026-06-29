import React from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, setTheme }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-dark-bg/70 border-b border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Project Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue to-brand-purple shadow-md">
            <span className="text-white text-xs font-black tracking-tighter">CF</span>
          </div>
          <span className="font-display font-bold text-gray-900 dark:text-white tracking-tight text-base sm:text-lg">
            CF Problem Recommendation
          </span>
        </div>

        {/* Right: Theme Toggle & GitHub Link */}
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          
          <a
            href="https://github.com/sathwik123677"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>


      </div>
    </header>
  );
}
