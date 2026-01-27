import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music2, Heart, MessageCircle, Share2, Play, Users, Video, ExternalLink, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// ============================================
// CUSTOMIZE YOUR TIKTOK INFO HERE
// ============================================
const TIKTOK_CONFIG = {
  username: '@yourusername', // Your TikTok username
  profileUrl: 'https://tiktok.com/@yourusername', // Your TikTok profile URL
  // Placeholder data - will be replaced when API is integrated
  placeholderData: {
    displayName: 'Your Name',
    avatar: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=200&h=200&fit=crop',
    followers: '10.5K',
    following: '234',
    likes: '125.6K',
    videos: '48',
    bio: '✨ Creating anime-inspired content | Developer & Artist 🎨',
    isVerified: false,
  }
};
// ============================================

export default function TikTokWidget({ isDark }) {
  const [profileData, setProfileData] = useState(TIKTOK_CONFIG.placeholderData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Placeholder for future TikTok API integration
  // You can enable this when you have API access
  /*
  useEffect(() => {
    const fetchTikTokData = async () => {
      setIsLoading(true);
      try {
        // Example API call - replace with actual TikTok API integration
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `Get TikTok profile data for ${TIKTOK_CONFIG.username}`,
          add_context_from_internet: true,
          response_json_schema: {
            type: "object",
            properties: {
              displayName: { type: "string" },
              followers: { type: "string" },
              following: { type: "string" },
              likes: { type: "string" },
              videos: { type: "string" },
              bio: { type: "string" }
            }
          }
        });
        if (response) {
          setProfileData(prev => ({ ...prev, ...response }));
        }
      } catch (err) {
        setError('Unable to fetch TikTok data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTikTokData();
  }, []);
  */

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl p-6 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900/80 to-pink-900/20 border border-pink-500/20' 
          : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200'
      } backdrop-blur-lg shadow-xl`}
    >
      {/* TikTok Logo Animation */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-4 right-4"
      >
        <div className="relative">
          <Music2 className={`w-8 h-8 ${isDark ? 'text-pink-400' : 'text-pink-500'}`} />
          <div className="absolute -inset-1 bg-cyan-400/30 blur-sm rounded-full" />
        </div>
      </motion.div>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-cyan-500 rounded-full blur-sm" />
          <img
            src={profileData.avatar}
            alt="TikTok Profile"
            className="relative w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          {profileData.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-cyan-400 rounded-full p-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {profileData.displayName}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {TIKTOK_CONFIG.username}
          </p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {profileData.bio}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`grid grid-cols-4 gap-3 mt-6 p-4 rounded-2xl ${
        isDark ? 'bg-black/30' : 'bg-gradient-to-r from-pink-50 to-blue-50'
      }`}>
        {[
          { icon: Users, label: 'Followers', value: profileData.followers },
          { icon: Heart, label: 'Following', value: profileData.following },
          { icon: Heart, label: 'Likes', value: profileData.likes, filled: true },
          { icon: Video, label: 'Videos', value: profileData.videos },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <Icon className={`w-4 h-4 mx-auto mb-1 ${
                stat.filled 
                  ? 'text-red-500 fill-red-500' 
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Follow Button */}
      <motion.a
        href={TIKTOK_CONFIG.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-4 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-pink-500 via-red-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-pink-500/30' 
            : 'bg-gradient-to-r from-pink-500 via-red-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-pink-500/30'
        }`}
      >
        <Music2 className="w-4 h-4" />
        Follow on TikTok
        <ExternalLink className="w-4 h-4" />
      </motion.a>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-3xl">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
    </motion.div>
  );
}