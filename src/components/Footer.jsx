import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-light-border dark:border-dark-border/40 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm transition-colors duration-300">
     <div className="max-w-7xl mx-auto px-6">
  <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 dark:text-gray-500">

    <span className="font-medium whitespace-nowrap">
      Made with <span className="text-red-500">❤️</span> for Competitive Programmers
    </span>

    <span className="text-gray-600">|</span>

    <span className="font-medium whitespace-nowrap">
      Built by <span className="font-semibold text-gray-800 dark:text-gray-100">Sathwik</span>
    </span>

    <span className="text-gray-600">|</span>

    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium whitespace-nowrap hover:text-brand-blue transition-colors"
    >
      GitHub
    </a>

    <span className="text-gray-600">|</span>

    <a
      href="https://codeforces.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium whitespace-nowrap hover:text-brand-purple transition-colors"
    >
      Codeforces
    </a>

  </div>
</div>
    </footer>
  );
}
