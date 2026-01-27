import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, X, RefreshCw } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Default anime-style dark blue pastel background
const DEFAULT_NIGHT_BG = "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop";

export default function BackgroundUploader({ isDark, customBg, setCustomBg }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setCustomBg(file_url);
      // Save to localStorage for persistence
      localStorage.setItem('portfolio_night_bg', file_url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetBackground = () => {
    setCustomBg(DEFAULT_NIGHT_BG);
    localStorage.setItem('portfolio_night_bg', DEFAULT_NIGHT_BG);
  };

  if (!isDark) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <div className="flex items-center gap-2">
        {customBg && customBg !== DEFAULT_NIGHT_BG && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetBackground}
            className="p-3 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-300"
            title="Reset to default background"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50"
          title="Upload custom background"
        >
          {isUploading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Upload className="w-5 h-5" />
            </motion.div>
          ) : (
            <Image className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </motion.div>
  );
}

export { DEFAULT_NIGHT_BG };