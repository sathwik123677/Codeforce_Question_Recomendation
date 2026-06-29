import React, { useState } from 'react';
import { Settings, User, Target, BarChart2, RotateCcw, Rocket, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const AVAILABLE_TOPICS = [
  'implementation', 'math', 'greedy', 'dp', 'data structures',
  'brute force', 'graphs', 'sortings', 'binary search',
  'dfs and similar', 'trees', 'strings', 'number theory',
  'combinatorics', 'two pointers', 'bitmasks', 'geometry',
  'shortest paths', 'divide and conquer', 'hashing',
  'games', 'flows', 'matrices'
];

export default function RecommendationForm({ onSubmit, loading }) {
  const [username, setUsername] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numProblems, setNumProblems] = useState(5);

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleResetSlider = () => {
    setNumProblems(5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter your Codeforces username');
      return;
    }
    onSubmit({
      username: username.trim(),
      topics: selectedTopics,
      numProblems
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl shadow-xl dark:shadow-2xl shadow-gray-200/50 dark:shadow-black/50 p-6 sm:p-8 transition-colors duration-300"
      >
        {/* Form Header */}
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-light-border dark:border-dark-border">
          <Settings size={20} className="text-brand-purple" />
          <h2 className="text-xl font-bold font-display text-gray-900 dark:text-white">Configuration</h2>
        </div>

        {/* 1. Codeforces Username */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <User size={16} className="text-brand-blue" />
            <span>Codeforces Username</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your handle (e.g., tourist, jiangly,sathwikp06,..)"
              className="w-full pl-4 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-light-border dark:border-dark-border focus:border-brand-purple dark:focus:border-brand-purple focus:outline-none rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
              disabled={loading}
            />
          </div>
        </div>

        {/* 2. Topics of Interest (Optional) */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
            <Target size={16} className="text-brand-purple" />
            <span>Topics of Interest (Optional)</span>
          </label>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            Select specific topics to focus on - leave empty for general recommendations
          </p>
          
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TOPICS.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicToggle(topic)}
                  disabled={loading}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all duration-150 select-none ${
                    isSelected
                      ? 'bg-brand-purple/10 dark:bg-brand-purple/20 border-brand-purple text-brand-purple dark:text-white shadow-sm shadow-brand-purple/10'
                      : 'bg-white dark:bg-dark-card border-light-border dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors border ${
                    isSelected
                      ? 'bg-brand-purple border-brand-purple text-white'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {isSelected && <Check size={10} strokeWidth={3} />}
                  </span>
                  <span className="capitalize">{topic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Number of Problems (Optional) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <BarChart2 size={16} className="text-brand-blue" />
              <span>Number of Problems (Optional)</span>
            </label>
            
            {/* Value display and Reset Button */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-50 dark:bg-gray-900 border border-light-border dark:border-dark-border rounded-lg text-xs font-bold text-gray-800 dark:text-gray-200 min-w-8 text-center">
                {numProblems}
              </span>
              <button
                type="button"
                onClick={handleResetSlider}
                disabled={loading}
                title="Reset to default (5)"
                className="p-1 border border-light-border dark:border-dark-border rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            How many recommendations? Default is 5
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium">1</span>
            <input
              type="range"
              min="1"
              max="15"
              value={numProblems}
              onChange={(e) => setNumProblems(parseInt(e.target.value))}
              disabled={loading}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-purple dark:accent-brand-purple transition-all duration-200 disabled:opacity-50"
            />
            <span className="text-xs text-gray-400 font-medium">15</span>
          </div>
        </div>

        {/* 4. Recommend Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm sm:text-base font-semibold rounded-2xl cursor-pointer hover:opacity-95 hover:shadow-lg hover:shadow-brand-purple/20 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition-all duration-200"
        >
          <Rocket size={18} className={loading ? 'animate-bounce' : ''} />
          <span>{loading ? 'Analyzing Profile...' : 'Get Personalized Recommendations'}</span>
        </button>

      </form>
    </div>
  );
}
