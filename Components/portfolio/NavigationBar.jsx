import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Film, Palette } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

const tabs = [
  { id: 'developer', label: 'Developer', icon: Code2 },
  { id: 'animation', label: 'Animation', icon: Film },
  { id: 'art', label: 'Art', icon: Palette },
];

export default function NavigationBar({ activeTab, setActiveTab, isDark, onToggleTheme }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-500 ${
        isDark 
          ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/80 backdrop-blur-md border-b border-pink-100'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`text-xl font-bold ${isDark ? 'text-pink-300' : 'text-pink-500'}`}
        >
          <span className="text-2xl">✨</span> Portfolio
        </motion.div>

        {/* Tab Navigation */}
        <div className={`flex items-center gap-1 p-1 rounded-full ${
          isDark ? 'bg-gray-900/50' : 'bg-gradient-to-r from-pink-100 to-blue-100'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? isDark 
                      ? 'text-white' 
                      : 'text-white'
                    : isDark 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                        : 'bg-gradient-to-r from-pink-400 to-blue-400'
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10 font-medium hidden sm:inline">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </motion.nav>
  );
}