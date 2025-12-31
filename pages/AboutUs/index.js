import React from 'react';
import { FaRocket, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-20 relative">
      <div className="wrapper relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-6">
            About <span className="text-gradient">URL Shortener</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simplifying links, one click at a time. We build tools that help you connect with your audience faster and smarter.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <div className="mb-24 text-center">
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 mb-8">
                <div className="px-8 py-3 rounded-xl bg-[#0a0a0a] border border-white/5">
                    <span className="text-primary-400 font-semibold tracking-wide uppercase text-sm">Our Mission</span>
                </div>
            </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
             Every link should be simple, <br/> memorable, and secure.
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            At URL Shortener, our mission is to make sharing links easier, faster, and more efficient. We believe that detailed analytics and robust security shouldn't be complicated. They should be accessible to everyone, from individuals to large enterprises.
          </p>
        </div>

        {/* Features and Benefits */}
        <div className="mb-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <FaRocket />, title: "Fast & Reliable", desc: "Generate short links instantly with 99.9% uptime architecture." },
              { icon: <FaChartLine />, title: "Link Analytics", desc: "Track users, locations, and devices with detailed real-time insights." },
              { icon: <FaShieldAlt />, title: "Secure Links", desc: "Enterprise-grade security to protect your data and your users." },
              { icon: <FaUsers />, title: "User-Friendly", desc: "Intuitive interface designed for everyone. No coding required." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-colors"
              >
                <div className="text-4xl text-primary-500 mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;