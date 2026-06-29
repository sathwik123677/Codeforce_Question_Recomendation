import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Background radial gradient overlay for premium depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/10 dark:bg-brand-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      
      {/* Hero Title Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
          Master Codeforces <br className="sm:hidden" />
          <span className="bg-linear-to-r from-blue-500 via-brand-purple to-purple-600 dark:from-blue-400 dark:via-brand-purple dark:to-pink-500 bg-clip-text text-transparent block mt-2 sm:mt-3">
            with Personalized Recommendations
          </span>
        </h1>
      </motion.div>

      {/* Hero Description Container */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-normal"
      >
        Get personalized problem recommendations based on your profile,<br className="hidden md:inline" />
        weak topics and improve your Codeforces rating.
      </motion.p>
      
    </section>
  );
}
