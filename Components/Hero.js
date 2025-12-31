import React from 'react';
import ShortenerForm from './ShortenerForm';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-secondary-600/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="wrapper w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-primary-300">✨ Fast, Secure & Reliable URL Shortener</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-white"
          >
            Shorten Links, <br />
            <span className="text-gradient">Expand Reach.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            The most powerful URL shortener for modern businesses. Track clicks, manage campaigns, and create custom branded links in seconds.
          </motion.p>

          <ShortenerForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
