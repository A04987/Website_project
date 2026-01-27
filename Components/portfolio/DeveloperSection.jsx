import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Smartphone, Database, Sparkles, ExternalLink, Github } from 'lucide-react';
import ProfileSection from './ProfileSection';
import TikTokWidget from './TikTokWidget.jsx';

// ============================================
// CUSTOMIZE YOUR SKILLS & PROJECTS HERE
// ============================================
const DEVELOPER_DATA = {
  skills: [
    { name: 'React', level: 90, icon: '⚛️' },
    { name: 'JavaScript', level: 85, icon: '🟨' },
    { name: 'TypeScript', level: 80, icon: '🔷' },
    { name: 'Node.js', level: 75, icon: '💚' },
    { name: 'Python', level: 70, icon: '🐍' },
    { name: 'CSS/Tailwind', level: 95, icon: '🎨' },
  ],
  projects: [
    {
      title: 'Anime Portfolio',
      description: 'A beautiful anime-styled personal portfolio with day/night mode',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      tags: ['React', 'Tailwind', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Kawaii Task Manager',
      description: 'Cute task management app with anime characters',
      image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&h=400&fit=crop',
      tags: ['Next.js', 'MongoDB', 'Auth'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Art Gallery API',
      description: 'RESTful API for managing digital art collections',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      tags: ['Node.js', 'Express', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ],
};
// ============================================

export default function DeveloperSection({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Profile Section */}
      <ProfileSection isDark={isDark} />

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`lg:col-span-2 rounded-3xl p-6 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/80 to-blue-900/30 border border-blue-500/20' 
              : 'bg-gradient-to-br from-white/90 to-blue-50/90 border border-blue-200'
          } backdrop-blur-lg shadow-xl`}
        >
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
            Skills & Technologies
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {DEVELOPER_DATA.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-2xl ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{skill.icon}</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                      {skill.name}
                    </span>
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                        : 'bg-gradient-to-r from-pink-400 to-blue-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TikTok Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TikTokWidget isDark={isDark} />
        </motion.div>
      </div>

      {/* Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-3xl p-6 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/80 to-purple-900/30 border border-purple-500/20' 
            : 'bg-gradient-to-br from-white/90 to-pink-50/90 border border-pink-200'
        } backdrop-blur-lg shadow-xl`}
      >
        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <Code2 className="w-6 h-6 text-blue-400" />
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVELOPER_DATA.projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-800/50' : 'bg-white/80'
              } shadow-lg`}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              <div className="p-4">
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDark 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}