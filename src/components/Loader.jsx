import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  'Analyzing your profile...',
  'Fetching recent submissions...',
  'Evaluating weak topics...',
  'Curating tailored Codeforces problems...',
  'Finding the best problems for you...'
];

export default function Loader() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prevIndex) => (prevIndex + 1) % LOADING_STEPS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Premium Loader Ring */}
      <div className="relative flex items-center justify-center mb-6">
        <Loader2 size={40} className="text-brand-purple animate-spin" />
        <div className="absolute inset-0 w-10 h-10 border-4 border-t-brand-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-ping opacity-25" />
      </div>

      {/* Cycling Messages with Framer Motion transitions */}
      <div className="h-6 overflow-hidden flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {LOADING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
