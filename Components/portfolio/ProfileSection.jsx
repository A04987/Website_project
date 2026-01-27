import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

// ============================================
// CUSTOMIZE YOUR PROFILE HERE
// ============================================
const PROFILE_DATA = {
  name: "Your Name",
  title: "Developer & Artist",
  bio: "Welcome to my creative space! I'm passionate about bringing ideas to life through code and art. I love creating beautiful digital experiences and cute anime-inspired designs.",
  profileImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop", // Replace with your image URL
  socialLinks: [
    { platform: 'github', url: 'https://github.com', icon: Github },
    { platform: 'twitter', url: 'https://twitter.com', icon: Twitter },
    { platform: 'instagram', url: 'https://instagram.com', icon: Instagram },
    { platform: 'linkedin', url: 'https://linkedin.com', icon: Linkedin },
  ],
  stats: [
    { label: 'Projects', value: '50+' },
    { label: 'Followers', value: '10K' },
    { label: 'Years Exp', value: '5+' },
  ]
};
// ============================================

export default function ProfileSection({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl p-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/80 to-purple-900/30 border border-purple-500/20' 
          : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200'
      } backdrop-blur-lg shadow-xl`}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
        isDark ? 'bg-purple-500/20' : 'bg-pink-300/30'
      }`} />
      <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl ${
        isDark ? 'bg-blue-500/20' : 'bg-blue-200/40'
      }`} />

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          className="relative"
        >
          <div className={`absolute inset-0 rounded-full blur-md ${
            isDark 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'bg-gradient-to-r from-pink-400 to-blue-400'
          }`} />
          <img
            src={PROFILE_DATA.profileImage}
            alt="Profile"
            className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {/* Cute sparkle */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 text-2xl"
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            {PROFILE_DATA.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-lg mb-4 ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500'
            } font-medium`}
          >
            {PROFILE_DATA.title}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {PROFILE_DATA.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            {PROFILE_DATA.socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-purple-500/30 hover:text-purple-300' 
                      : 'bg-white/80 text-gray-600 hover:bg-pink-100 hover:text-pink-500 shadow-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`flex md:flex-col gap-6 p-4 rounded-2xl ${
            isDark ? 'bg-gray-800/30' : 'bg-white/50'
          }`}
        >
          {PROFILE_DATA.stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className={`text-2xl font-bold ${
                isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500'
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}