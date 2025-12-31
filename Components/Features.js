import React from 'react';
import { motion } from 'framer-motion';
import { MdInsights, MdEdit, MdLink } from 'react-icons/md';

const features = [
  {
    icon: <MdLink className="text-3xl" />,
    title: "Shorten Links",
    desc: "Transform long, unmanageable URLs into clean, short links that look professional.",
    color: "from-blue-500 to-cyan-400",
    bg: "group-hover:shadow-blue-500/20"
  },
  {
    icon: <MdEdit className="text-3xl" />,
    title: "Custom Aliases",
    desc: "Create meaningful links with custom aliases. Make your URLs descriptive.",
    color: "from-purple-500 to-pink-500",
    bg: "group-hover:shadow-purple-500/20"
  },
  {
    icon: <MdInsights className="text-3xl" />,
    title: "Track Performance",
    desc: "Gain insights into your link performance. Track clicks and engagement.",
    color: "from-amber-500 to-orange-500",
    bg: "group-hover:shadow-amber-500/20"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]/50 relative border-t border-white/5">
      <div className="wrapper">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            Everything you need.
          </h2>
          <p className="text-gray-400 text-lg">
            Powerful features packed into a simple interface.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group p-8 rounded-3xl bg-[#171717] border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 ${feature.bg} shadow-none hover:shadow-2xl`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
