import React from 'react';
import { motion } from 'framer-motion';

// ============================================
// 1. CUSTOM BRAND ICONS (โลโก้แอปจริง)
// ============================================

const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V13.3c0 1.93-.53 3.84-1.6 5.37-1.39 2.01-3.76 3.25-6.2 3.32-2.15.06-4.32-.78-5.88-2.26-1.89-1.81-2.73-4.66-1.92-7.15C3.39 10.33 5.48 8.44 8 8.07c.46-.05.93-.07 1.4-.04v4.11c-.93-.19-1.97.04-2.65.73-.78.8-.82 2.15-.12 3.05.65.86 1.83 1.14 2.85.76 1.05-.39 1.58-1.55 1.58-2.65V.02z" />
  </svg>
);

const DiscordIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

const VGenIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.8 8.6L22 9.2L16.5 14L18.2 21L12 17.3L5.8 21L7.5 14L2 9.2L9.2 8.6L12 2Z" />
    <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3" />
  </svg>
);

// ============================================
// 2. DATA CONFIGURATION
// ============================================

const PROFILE_DATA = {
  name: "Your Name",
  title: "Developer & Artist",
  bio: "Welcome to my creative space! I'm passionate about bringing ideas to life through code and art. I love creating beautiful digital experiences and cute anime-inspired designs.",
  profileImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop", 
  socialLinks: [
    { 
      platform: 'tiktok_main', 
      url: 'https://www.tiktok.com/@moji_tan', 
      icon: TikTokIcon, 
      label: 'TikTok Animation Account',
      brandColor: 'hover:bg-black hover:text-[#00f2ea]' 
    },
    { 
      platform: 'tiktok_art', 
      url: 'https://www.tiktok.com/@mojitan_art', 
      icon: TikTokIcon, 
      label: 'TikTok Art Account',
      brandColor: 'hover:bg-black hover:text-[#ff0050]' 
    },
    { 
      platform: 'discord server', 
      url: 'https://discord.gg/K4b5UBgWPP', 
      icon: DiscordIcon, 
      label: 'Discord Server',
      brandColor: 'hover:bg-[#5865F2] hover:text-white' 
    },
    { 
      platform: 'vgen', 
      url: 'https://vgen.co/your_profile', 
      icon: VGenIcon, 
      label: 'VGen Commission',
      brandColor: 'hover:bg-[#7B61FF] hover:text-white' 
    },
  ],
  stats: [
    { label: 'Projects', value: '50+' },
    { label: 'Followers', value: '10K' },
    { label: 'Years Exp', value: '5+' },
  ]
};

// ============================================
// 3. COMPONENT RENDER
// ============================================

export default function ProfileSection({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl p-8 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/80 to-purple-900/30 border border-purple-500/20 shadow-purple-500/10' 
          : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200 shadow-pink-200/50'
      } backdrop-blur-lg shadow-xl`}
    >
      {/* Background Decorative Blur Circles */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
        isDark ? 'bg-purple-500/20' : 'bg-pink-300/30'
      }`} />
      <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl ${
        isDark ? 'bg-blue-500/20' : 'bg-blue-200/40'
      }`} />

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image with Glow */}
        <motion.div
          whileHover={{ scale: 1.05 }}
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
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 text-2xl"
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Profile Info Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {PROFILE_DATA.name}
          </h1>
          
          <p className={`text-lg mb-4 font-semibold ${
              isDark 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500'
            }`}
          >
            {PROFILE_DATA.title}
          </p>
          
          <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {PROFILE_DATA.bio}
          </p>

          {/* Social Links Icons Loop */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            {PROFILE_DATA.socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.label}
                  className={`p-3 rounded-2xl transition-all duration-300 flex items-center justify-center border ${
                    isDark 
                      ? 'bg-gray-800/50 text-gray-400 border-gray-700' 
                      : 'bg-white/80 text-gray-500 border-gray-100 shadow-sm'
                  } ${link.brandColor}`}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`flex md:flex-col gap-6 p-6 rounded-2xl ${
            isDark ? 'bg-gray-800/30' : 'bg-pink-50/50'
          }`}
        >
          {PROFILE_DATA.stats.map((stat) => (
            <motion.div 
              key={stat.label}
              whileHover={{ y: -2 }}
              className="text-center"
            >
              <div className={`text-2xl font-bold ${
                isDark ? 'text-purple-400' : 'text-pink-500'
              }`}>
                {stat.value}
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-bold ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}