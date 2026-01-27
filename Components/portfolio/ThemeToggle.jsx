import React from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-20 h-10 rounded-full p-1 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
          : 'linear-gradient(135deg, #87CEEB 0%, #FFB7C5 100%)'
      }}
    >
      {/* Stars for night mode */}
      {isDark && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-6 w-0.5 h-0.5 bg-yellow-200 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-white rounded-full"
          />
        </>
      )}
      
      {/* Clouds for day mode */}
      {!isDark && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0.6, x: 0 }}
          className="absolute top-2 right-4 w-4 h-2 bg-white rounded-full"
        />
      )}
      
      {/* Sun/Moon Toggle */}
      <motion.div
        animate={{
          x: isDark ? 40 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #f5f5dc 0%, #e6e6c8 100%)' 
            : 'linear-gradient(135deg, #FFD93D 0%, #FF9A3C 100%)',
          boxShadow: isDark 
            ? '0 0 10px rgba(245, 245, 220, 0.5)' 
            : '0 0 15px rgba(255, 217, 61, 0.6)'
        }}
      >
        {/* Sun rays */}
        {!isDark && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="absolute w-1 h-2 bg-yellow-400 rounded-full"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-12px)`,
                }}
              />
            ))}
          </>
        )}
        
        {/* Moon craters */}
        {isDark && (
          <>
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-40" />
            <div className="absolute bottom-2 left-1.5 w-1 h-1 bg-gray-300 rounded-full opacity-30" />
          </>
        )}
        
        {/* Cute face */}
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-1.5 w-2 h-1 border-b-2 border-pink-400 rounded-full"
        />
      </motion.div>
    </button>
  );
}