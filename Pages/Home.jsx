import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationBar from '@/Components/portfolio/NavigationBar';
import DeveloperSection from '@/Components/portfolio/DeveloperSection';
import AnimationSection from '@/Components/portfolio/AnimationSection';
import ArtSection from '@/Components/portfolio/ArtSection';
import BackgroundUploader, { DEFAULT_NIGHT_BG } from '@/Components/portfolio/BackgroundUploader';
import MusicPlayer from '@/Components/portfolio/MusicPlayer';
import '@/src/index.css';

function Home() {
  const [activeTab, setActiveTab] = useState('developer');
  const [isDark, setIsDark] = useState(false);
  const [customBg, setCustomBg] = useState(() => {
    return localStorage.getItem('portfolio_night_bg') || DEFAULT_NIGHT_BG;
  });

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // Save theme preference
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('portfolio_theme', newTheme ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'developer':
        return <DeveloperSection isDark={isDark} />;
      case 'animation':
        return <AnimationSection isDark={isDark} />;
      case 'art':
        return <ArtSection isDark={isDark} />;
      default:
        return <DeveloperSection isDark={isDark} />;
    }
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-700 ${
        isDark 
          ? 'bg-[#0a0a14]' 
          : 'bg-gradient-to-br from-pink-100 via-blue-50 to-pink-50'
      }`}
      style={isDark ? {
        backgroundImage: `url(${customBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      } : {}}
    >
      {/* Dark overlay for night mode */}
      {isDark && (
        <div className="fixed inset-0 bg-[#0a0a14]/70 pointer-events-none" />
      )}

      {/* Animated background elements for day mode */}
      {!isDark && (
        <>
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Floating bubbles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-pink-200/40 to-blue-200/40"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Sparkles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-pink-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Night mode stars */}
      {isDark && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <NavigationBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12 px-4 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Uploader (Night mode only) */}
      <BackgroundUploader 
        isDark={isDark} 
        customBg={customBg} 
        setCustomBg={setCustomBg} 
      />
      <MusicPlayer isDark={isDark} />
      {/* Footer */}
      <footer className={`relative z-10 text-center py-8 ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm"
        >
          Made with 💖 and ✨ magic
        </motion.p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)