import React from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Clock, Eye, Heart, Star } from 'lucide-react';

// ============================================
// CUSTOMIZE YOUR ANIMATIONS HERE
// ============================================
const ANIMATION_DATA = {
  featured: {
    title: "Cherry Blossom Dreams",
    description: "A 2-minute animated short about a magical garden where cherry blossoms come to life. Created using Blender and After Effects.",
    thumbnail: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=450&fit=crop",
    duration: "2:34",
    views: "12.5K",
    likes: "1.2K",
    videoUrl: "#",
  },
  projects: [
    {
      title: "Starlight Waltz",
      thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=225&fit=crop",
      duration: "1:45",
      category: "Short Film",
    },
    {
      title: "Neon City Nights",
      thumbnail: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=400&h=225&fit=crop",
      duration: "3:20",
      category: "Music Video",
    },
    {
      title: "Ocean Spirits",
      thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop",
      duration: "2:10",
      category: "Motion Graphics",
    },
    {
      title: "Forest Whispers",
      thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=225&fit=crop",
      duration: "4:05",
      category: "Animated Short",
    },
    {
      title: "Crystal Dreams",
      thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c036bc0894?w=400&h=225&fit=crop",
      duration: "1:55",
      category: "Loop Animation",
    },
    {
      title: "Sakura Festival",
      thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=225&fit=crop",
      duration: "2:45",
      category: "Short Film",
    },
  ],
  tools: [
    { name: 'After Effects', icon: '🎬' },
    { name: 'Blender', icon: '🎨' },
    { name: 'Premiere Pro', icon: '🎥' },
    { name: 'Clip Studio', icon: '✏️' },
  ],
};
// ============================================

export default function AnimationSection({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Featured Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/80 to-indigo-900/30 border border-indigo-500/20' 
            : 'bg-gradient-to-br from-white/90 to-blue-50/90 border border-blue-200'
        } backdrop-blur-lg shadow-xl`}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Video Thumbnail */}
          <div className="relative group cursor-pointer">
            <img
              src={ANIMATION_DATA.featured.thumbnail}
              alt={ANIMATION_DATA.featured.title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-pink-400 to-blue-400'
                } shadow-lg`}
              >
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </motion.div>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {ANIMATION_DATA.featured.duration}
            </div>
          </div>

          {/* Info */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                isDark 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'bg-pink-100 text-pink-600'
              }`}>
                <Star className="w-3 h-3" fill="currentColor" />
                Featured Work
              </span>

              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {ANIMATION_DATA.featured.title}
              </h2>

              <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {ANIMATION_DATA.featured.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Eye className="w-4 h-4" />
                  <span>{ANIMATION_DATA.featured.views}</span>
                </div>
                <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                  <span>{ANIMATION_DATA.featured.likes}</span>
                </div>
              </div>

              <motion.a
                href={ANIMATION_DATA.featured.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30' 
                    : 'bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:shadow-lg hover:shadow-pink-500/30'
                }`}
              >
                <Play className="w-4 h-4" fill="white" />
                Watch Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {ANIMATION_DATA.tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 ${
              isDark 
                ? 'bg-gray-900/60 border border-gray-700 text-white' 
                : 'bg-white/80 border border-pink-200 text-gray-700 shadow-sm'
            }`}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Animation Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-3xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/80 to-purple-900/30 border border-purple-500/20' 
            : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200'
        } backdrop-blur-lg shadow-xl`}
      >
        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <Film className="w-6 h-6 text-purple-400" />
          Animation Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ANIMATION_DATA.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                isDark ? 'bg-gray-800/50' : 'bg-white/80'
              } shadow-lg`}
            >
              <div className="relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Play Button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-purple-500' : 'bg-pink-400'
                  }`}>
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </motion.div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-xs">
                  {project.duration}
                </div>

                {/* Category */}
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs ${
                  isDark ? 'bg-purple-500/80 text-white' : 'bg-pink-400/80 text-white'
                }`}>
                  {project.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}