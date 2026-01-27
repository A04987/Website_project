import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Heart, Download, ZoomIn, X, Sparkles } from 'lucide-react';

// ============================================
// CUSTOMIZE YOUR ARTWORK HERE
// ============================================
const ART_DATA = {
  categories: ['All', 'Digital Art', 'Illustrations', 'Character Design', 'Fan Art'],
  artworks: [
    {
      id: 1,
      title: "Sakura Spirit",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=600&fit=crop",
      category: "Digital Art",
      likes: 245,
      glowColor: "pink",
    },
    {
      id: 2,
      title: "Crystal Guardian",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
      category: "Character Design",
      likes: 189,
      glowColor: "blue",
    },
    {
      id: 3,
      title: "Moonlit Dreams",
      image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&h=600&fit=crop",
      category: "Illustrations",
      likes: 312,
      glowColor: "purple",
    },
    {
      id: 4,
      title: "Forest Fairy",
      image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&h=600&fit=crop",
      category: "Character Design",
      likes: 276,
      glowColor: "green",
    },
    {
      id: 5,
      title: "Ocean Melody",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=600&fit=crop",
      category: "Digital Art",
      likes: 198,
      glowColor: "cyan",
    },
    {
      id: 6,
      title: "Starlight Princess",
      image: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=600&h=600&fit=crop",
      category: "Fan Art",
      likes: 421,
      glowColor: "yellow",
    },
    {
      id: 7,
      title: "Neon Dreams",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=600&fit=crop",
      category: "Digital Art",
      likes: 367,
      glowColor: "pink",
    },
    {
      id: 8,
      title: "Autumn Whisper",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      category: "Illustrations",
      likes: 234,
      glowColor: "orange",
    },
    {
      id: 9,
      title: "Magic Hour",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=600&fit=crop",
      category: "Fan Art",
      likes: 289,
      glowColor: "purple",
    },
  ],
};

const glowColors = {
  pink: 'group-hover:shadow-[0_0_30px_rgba(255,182,193,0.7)]',
  blue: 'group-hover:shadow-[0_0_30px_rgba(135,206,235,0.7)]',
  purple: 'group-hover:shadow-[0_0_30px_rgba(186,85,211,0.7)]',
  green: 'group-hover:shadow-[0_0_30px_rgba(152,251,152,0.7)]',
  cyan: 'group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]',
  yellow: 'group-hover:shadow-[0_0_30px_rgba(255,255,0,0.5)]',
  orange: 'group-hover:shadow-[0_0_30px_rgba(255,165,0,0.6)]',
};

const borderGlowColors = {
  pink: 'group-hover:border-pink-300',
  blue: 'group-hover:border-blue-300',
  purple: 'group-hover:border-purple-300',
  green: 'group-hover:border-green-300',
  cyan: 'group-hover:border-cyan-300',
  yellow: 'group-hover:border-yellow-300',
  orange: 'group-hover:border-orange-300',
};
// ============================================

export default function ArtSection({ isDark }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArt, setSelectedArt] = useState(null);
  const [likedArt, setLikedArt] = useState(new Set());

  const filteredArtworks = activeCategory === 'All' 
    ? ART_DATA.artworks 
    : ART_DATA.artworks.filter(art => art.category === activeCategory);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedArt(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl p-8 text-center ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/80 to-pink-900/30 border border-pink-500/20' 
            : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200'
        } backdrop-blur-lg shadow-xl`}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block mb-4"
        >
          <Palette className={`w-12 h-12 ${isDark ? 'text-pink-400' : 'text-pink-500'}`} />
        </motion.div>
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Art Gallery ✨
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          A collection of my digital artworks and illustrations
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {ART_DATA.categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? isDark 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30' 
                  : 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg shadow-pink-500/30'
                : isDark 
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700' 
                  : 'bg-white/80 text-gray-600 hover:bg-pink-50 border border-pink-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Art Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art, index) => (
            <motion.div
              key={art.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedArt(art)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border-2 ${
                isDark 
                  ? `bg-gray-900/50 border-gray-800 ${borderGlowColors[art.glowColor]}` 
                  : `bg-white/80 border-pink-100 ${borderGlowColors[art.glowColor]}`
              } ${glowColors[art.glowColor]}`}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' 
                    : 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'
                }`} />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleLike(art.id, e)}
                    className={`p-3 rounded-full backdrop-blur-sm text-white ${
                      likedArt.has(art.id) 
                        ? 'bg-red-500/80 hover:bg-red-500' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedArt.has(art.id) ? 'fill-white' : ''}`} />
                  </motion.button>
                </div>

                {/* Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg">{art.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/80 text-sm">{art.category}</span>
                    <span className="flex items-center gap-1 text-white/80 text-sm">
                      <Heart className="w-3 h-3" fill="currentColor" />
                      {art.likes + (likedArt.has(art.id) ? 1 : 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sparkle Effect */}
              <motion.div
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedArt.image}
                alt={selectedArt.title}
                className="w-full h-full object-contain"
              />
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedArt(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h2 className="text-white text-2xl font-bold">{selectedArt.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-white/80">{selectedArt.category}</span>
                  <button
                    onClick={(e) => handleLike(selectedArt.id, e)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      likedArt.has(selectedArt.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedArt.has(selectedArt.id) ? 'fill-white' : ''}`} />
                    {selectedArt.likes + (likedArt.has(selectedArt.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}