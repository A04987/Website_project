import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Music, 
  Heart,
  ChevronUp,
  ChevronDown,
  Shuffle,
  Repeat,
  List
} from 'lucide-react';

// ============================================
// CUSTOMIZE YOUR PLAYLIST HERE
// Add your own music URLs (MP3 links or audio file URLs)
// ============================================
const PLAYLIST = [
  {
    id: 1,
    title: "Machine Love (Acoustic)",
    artist: "Kasane Teto",
    cover: "https://media.tenor.com/TyMkS_jWfL4AAAAe/kasane-teto-machine-love.png",
    // Replace with your actual audio URL
    audioUrl: "../../public/sounds/Machine-love-acoustic.mp3",
    duration: "4:57",
  },
  {
    id: 2,
    title: "Starlight Serenade",
    artist: "Kawaii Beats",
    cover: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=200&h=200&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:12",
  },
  {
    id: 3,
    title: "Moonlit Café",
    artist: "Anime Chill",
    cover: "https://images.unsplash.com/photo-1518173946687-a4c036bc0894?w=200&h=200&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:28",
  },
  {
    id: 4,
    title: "Sakura Rainfall",
    artist: "Japan Vibes",
    cover: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "5:01",
  },
  {
    id: 5,
    title: "Neon Tokyo Nights",
    artist: "Synthwave Anime",
    cover: "https://images.unsplash.com/photo-1545156521-77bd85671d30?w=200&h=200&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:33",
  },
];
// ============================================

export default function MusicPlayer({ isDark }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const track = PLAYLIST[currentTrack];

// --- ตัวแรก (จัดการระดับเสียง) ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // --- ตัวที่สอง (จัดการการเล่น/หยุด และเปลี่ยนเพลง) ---
  useEffect(() => {
    if (audioRef.current) {
      // 1. ตรวจสอบก่อนว่าเพลงที่กำลังจะเล่น คือเพลงเดิมหรือเพลงใหม่
      // โดยการเทียบ src ปัจจุบัน กับ src ของเพลงใน Playlist
      const isSameTrack = audioRef.current.src.includes(track.audioUrl.replace('../../public', ''));

      // 2. ถ้า "ไม่ใช่เพลงเดิม" (เช่น กด Next/Prev) ถึงจะสั่งโหลดใหม่
      if (!isSameTrack) {
        audioRef.current.load();
      }

      // 3. จัดการสถานะการเล่น
      if (isPlaying) {
        // ถ้าเป็นเพลงเดิม มันจะเล่นต่อจากวินาทีที่ค้างไว้ทันที
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        // สั่งหยุดเฉยๆ โดยไม่สั่ง load() จะทำให้ค่า currentTime ยังค้างอยู่ที่เดิม
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]); // ตรวจจับเมื่อกดเล่น/หยุด หรือเปลี่ยนเพลง

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleTrackEnd = () => {
    if (isRepeating) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextTrack();
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    if (isShuffled) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * PLAYLIST.length);
      } while (randomIndex === currentTrack && PLAYLIST.length > 1);
      setCurrentTrack(randomIndex);
    } else {
      setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    }
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    }
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleLike = (id) => {
    setLikedSongs(prev => {
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
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Main Player Container */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed bottom-4 left-4 z-50 ${isExpanded ? 'w-80' : 'w-auto'}`}
      >
        <motion.div
          layout
          className={`rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl ${
            isDark 
              ? 'bg-gray-900/90 border border-purple-500/30 shadow-purple-500/20' 
              : 'bg-white/90 border border-pink-200 shadow-pink-500/20'
          }`}
        >
          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Album Art & Info */}
                <div className="p-4">
                  <div className="relative">
                    {/* Spinning Vinyl Effect */}
                    <motion.div
                      
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="relative w-full aspect-square rounded-2xl overflow-hidden"
                    >
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Vinyl Overlay */}
                      <div className={`absolute inset-0 ${
                        isDark ? 'bg-purple-500/10' : 'bg-pink-500/10'
                      }`} />
                      
                      
                    </motion.div>

                    {/* Floating music notes */}
                    {isPlaying && (
                      <div className="absolute -top-2 -right-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [-10, -30],
                              x: [0, 10 + i * 5],
                              opacity: [1, 0],
                              scale: [1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                            className={`absolute text-lg ${
                              isDark ? 'text-pink-400' : 'text-pink-500'
                            }`}
                          >
                            ♪
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Like Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(track.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm ${
                        likedSongs.has(track.id)
                          ? 'bg-red-500/80 text-white'
                          : isDark 
                            ? 'bg-black/50 text-white' 
                            : 'bg-white/50 text-gray-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedSongs.has(track.id) ? 'fill-white' : ''}`} />
                    </motion.button>
                  </div>

                  {/* Track Info */}
                  <div className="mt-4 text-center">
                    <h3 className={`font-bold text-lg truncate ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {track.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {track.artist}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div
                      ref={progressRef}
                      onClick={handleProgressClick}
                      className={`h-2 rounded-full cursor-pointer ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}
                    >
                      <motion.div
                        className={`h-full rounded-full relative ${
                          isDark 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                            : 'bg-gradient-to-r from-pink-400 to-blue-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      >
                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                          isDark ? 'bg-pink-400' : 'bg-pink-500'
                        } shadow-lg`} />
                      </motion.div>
                    </div>
                    <div className={`flex justify-between text-xs mt-1 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsShuffled(!isShuffled)}
                      className={`p-2 rounded-full transition-colors ${
                        isShuffled
                          ? isDark ? 'text-pink-400' : 'text-pink-500'
                          : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Shuffle className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTrack}
                      className={`p-2 rounded-full ${
                        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <SkipBack className="w-5 h-5" fill="currentColor" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={togglePlay}
                      className={`p-4 rounded-full ${
                        isDark 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                          : 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-lg shadow-pink-500/30'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" fill="white" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" fill="white" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTrack}
                      className={`p-2 rounded-full ${
                        isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <SkipForward className="w-5 h-5" fill="currentColor" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsRepeating(!isRepeating)}
                      className={`p-2 rounded-full transition-colors ${
                        isRepeating
                          ? isDark ? 'text-pink-400' : 'text-pink-500'
                          : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Repeat className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Volume & Playlist */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className={isDark ? 'text-gray-400' : 'text-gray-500'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </motion.button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${isDark ? '#ec4899' : '#f472b6'} ${volume * 100}%, ${isDark ? '#374151' : '#e5e7eb'} ${volume * 100}%)`
                        }}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowPlaylist(!showPlaylist)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                        showPlaylist
                          ? isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-pink-100 text-pink-600'
                          : isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      Playlist
                    </motion.button>
                  </div>
                </div>

                {/* Playlist */}
                <AnimatePresence>
                  {showPlaylist && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="max-h-48 overflow-y-auto">
                        {PLAYLIST.map((song, index) => (
                          <motion.div
                            key={song.id}
                            whileHover={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                            onClick={() => {
                              setCurrentTrack(index);
                              setIsPlaying(true);
                            }}
                            className={`flex items-center gap-3 p-3 cursor-pointer ${
                              currentTrack === index
                                ? isDark ? 'bg-purple-500/10' : 'bg-pink-50'
                                : ''
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                              {currentTrack === index && isPlaying && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <div className="flex gap-0.5">
                                    {[...Array(3)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        animate={{ height: [4, 12, 4] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-white rounded-full"
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm truncate ${
                                currentTrack === index
                                  ? isDark ? 'text-pink-400' : 'text-pink-600'
                                  : isDark ? 'text-white' : 'text-gray-800'
                              }`}>
                                {song.title}
                              </p>
                              <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                {song.artist}
                              </p>
                            </div>
                            <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                              {song.duration}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed/Mini Player Bar */}
          <motion.div
            layout
            className="flex items-center gap-3 p-3"
          >
            {/* Mini Album Art */}
            <motion.div
              
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative"
            >
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              {!isExpanded && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  isDark ? 'bg-black/30' : 'bg-white/30'
                }`}>
                  <Music className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                </div>
              )}
            </motion.div>

            {/* Track Info (Mini) */}
            {!isExpanded && (
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {track.title}
                </p>
                <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {track.artist}
                </p>
              </div>
            )}

            {/* Mini Controls */}
            {!isExpanded && (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className={`p-2 rounded-full ${
                    isDark 
                      ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' 
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTrack}
                  className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>
              </div>
            )}

            {/* Expand/Collapse Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 rounded-full ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}