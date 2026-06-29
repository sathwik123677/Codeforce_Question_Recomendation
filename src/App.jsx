import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RotateCcw } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecommendationForm from './components/RecommendationForm';
import Loader from './components/Loader';
import Result from './components/Result';
import Footer from './components/Footer';
import { getRecommendations } from './services/api';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }
  return 'dark'; // Default to Dark mode as requested by premium mockup
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    // Apply the active theme class to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleRecommend = async ({ username, topics, numProblems }) => {
    setLoading(true);
    setError(null);
    setResultData(null);

    try {
      const data = await getRecommendations({ username, topics, numProblems });
      setResultData(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setResultData(null);
    setError(null);
    setFormKey((prev) => prev + 1); // Force form to reset back to default
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Toast notifications */}
      <Toaster 
        toastOptions={{
          className: 'bg-white dark:bg-dark-card text-gray-900 dark:text-white border border-light-border dark:border-dark-border text-sm rounded-xl',
          duration: 4000,
        }} 
      />

      {/* Navigation */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <Hero />

        {/* Configuration Panel */}
        <RecommendationForm key={formKey} onSubmit={handleRecommend} loading={loading} />

        {/* Loader Component */}
        {loading && <Loader />}

        {/* Results / Error Panel */}
        {!loading && (resultData || error) && (
          <>
            <Result data={resultData} error={error} />
            <div className="w-full flex justify-center mb-16">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-6 py-3 border border-light-border dark:border-dark-border bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-2xl text-sm font-semibold transition-all duration-200 shadow-sm cursor-pointer active:scale-[0.98]"
              >
                <RotateCcw size={15} />
                <span>Start Over / Fresh Page</span>
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
