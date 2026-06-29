import React from 'react';
import { 
  BarChart3, 
  Award, 
  AlertTriangle, 
  User, 
  Star, 
  Trophy, 
  CheckCircle, 
  Target, 
  Calendar, 
  Lightbulb 
} from 'lucide-react';
import { motion } from 'framer-motion';

const parseProfileAnalysis = (markdown) => {
  if (!markdown) return null;

  // Extract values using regex matching
  const usernameMatch = markdown.match(/\*\*Username:\*\*\s*(.+)/i);
  const currentRatingMatch = markdown.match(/\*\*Current Rating:\*\*\s*(\d+)/i);
  const maxRatingMatch = markdown.match(/\*\*Max Rating:\*\*\s*(\d+)/i);
  const solvedMatch = markdown.match(/\*\*Problems Solved:\*\*\s*(\d+)/i);
  
  // Accept "Recommended Practice Range" or similar variations
  const rangeMatch = markdown.match(/\*\*(Recommended Practice Range|Recommended Range|Practice Range):\*\*\s*(.+)/i);

  const username = usernameMatch ? usernameMatch[1].trim() : 'User';
  const currentRating = currentRatingMatch ? currentRatingMatch[1].trim() : 'N/A';
  const maxRating = maxRatingMatch ? maxRatingMatch[1].trim() : 'N/A';
  const problemsSolved = solvedMatch ? solvedMatch[1].trim() : 'N/A';
  const recommendedRange = rangeMatch ? rangeMatch[2].trim() : 'N/A';

  // Format date like: "May 29, 2025"
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    username,
    currentRating,
    maxRating,
    problemsSolved,
    recommendedRange,
    date: dateStr
  };
};

export default function Result({ data, error }) {
  if (error || (data && data.error)) {
    const displayError = error || data?.error;
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-4 mb-16"
      >
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-800 dark:text-red-300">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-bold text-sm font-display">Error Analyzing Profile</h3>
            <p className="text-xs sm:text-sm mt-1">{displayError}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data) return null;

  const { profile_analysis, recommended_problems } = data;
  const profile = parseProfileAnalysis(profile_analysis);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-16 flex flex-col gap-8">
      
      {/* 1. Profile Analysis Section */}
      {profile_analysis && profile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-black/50 p-6 sm:p-8 transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-light-border dark:border-dark-border">
            <BarChart3 size={20} className="text-brand-blue" />
            <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Profile Analysis</h2>
          </div>
          
          {/* User Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 dark:bg-brand-purple/10 border border-brand-blue/20 dark:border-brand-purple/30 text-brand-blue dark:text-brand-purple shadow-sm">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold font-display text-gray-900 dark:text-white tracking-tight leading-tight">
                  {profile.username}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                  Codeforces Profile Analysis
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/55 rounded-xl text-green-700 dark:text-green-400 text-xs font-semibold shadow-sm">
              <span>Active</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            
            {/* Current Rating */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-light-border dark:border-dark-border/40 rounded-2xl text-center">
              <Star size={18} className="text-brand-blue mb-2" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Current Rating
              </span>
              <span className="text-lg sm:text-xl font-black text-brand-blue mt-1">
                {profile.currentRating}
              </span>
            </div>

            {/* Max Rating */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-light-border dark:border-dark-border/40 rounded-2xl text-center">
              <Trophy size={18} className="text-brand-purple mb-2" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Max Rating
              </span>
              <span className="text-lg sm:text-xl font-black text-brand-purple mt-1">
                {profile.maxRating}
              </span>
            </div>

            {/* Problems Solved */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-light-border dark:border-dark-border/40 rounded-2xl text-center">
              <CheckCircle size={18} className="text-green-500 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Problems Solved
              </span>
              <span className="text-lg sm:text-xl font-black text-green-500 mt-1">
                {profile.problemsSolved}
              </span>
            </div>

            {/* Recommended Range */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-light-border dark:border-dark-border/40 rounded-2xl text-center col-span-2 md:col-span-1">
              <Target size={18} className="text-amber-500 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Recommended Range
              </span>
              <span className="text-sm sm:text-base font-black text-amber-500 mt-1.5">
                {profile.recommendedRange}
              </span>
            </div>

            {/* Analysis Date */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-light-border dark:border-dark-border/40 rounded-2xl text-center col-span-2 md:col-span-1">
              <Calendar size={18} className="text-gray-400 dark:text-gray-400 mb-2" />
              <span className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Analysis Date
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 mt-2">
                {profile.date}
              </span>
            </div>

          </div>

          {/* Suggestion Banner */}
          <div className="flex gap-3 p-4 bg-blue-50/40 dark:bg-brand-purple/5 border border-brand-blue/10 dark:border-brand-purple/20 rounded-2xl items-center">
            <div className="p-2 bg-brand-blue/10 dark:bg-brand-purple/10 text-brand-blue dark:text-brand-purple rounded-xl shrink-0">
              <Lightbulb size={16} />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              Keep up the great work! Focus on solving more problems in the recommended range to improve your consistency and rating.
            </p>
          </div>

        </motion.div>
      )}

      {/* 2. Recommended Problems Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-black/50 p-6 sm:p-8 transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-1 pb-4">
          <Award size={20} className="text-brand-purple" />
          <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Recommended Problems</h2>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 font-medium">
          Handpicked problems tailored for your growth
        </p>

        {recommended_problems && recommended_problems.includes('problem-row') ? (
          <>
            {/* Injected HTML List Container */}
            <div className="cf-html-content text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <div dangerouslySetInnerHTML={{ __html: recommended_problems }} />
            </div>

            {/* Banner at the bottom of the problems list */}
            <div className="flex gap-3 p-4 mt-6 bg-blue-50/40 dark:bg-brand-purple/5 border border-brand-blue/10 dark:border-brand-purple/20 rounded-2xl items-center">
              <div className="p-2 bg-brand-blue/10 dark:bg-brand-purple/10 text-brand-blue dark:text-brand-purple rounded-xl shrink-0">
                <Target size={16} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                Solve consistently in the recommended range to unlock higher difficulty problems.
              </p>
            </div>
          </>
        ) : (
          /* Empty / No Recommendations State */
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <span className="text-4xl mb-3 select-none">🎯</span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white font-display">No recommendations found.</h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-405 mt-1">
              Try selecting different topics.
            </p>
          </div>
        )}

      </motion.div>

    </div>
  );
}
