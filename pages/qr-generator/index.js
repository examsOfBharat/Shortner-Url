// pages/qr-generator.js
import React from "react";
import QRGenerator from "../../Components/QRGenerator";
import { motion } from "framer-motion";

const QRGeneratorPage = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center items-center p-6 lg:p-12 overflow-hidden">
      {/* Background Glows */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary-600/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mb-4">
          QR <span className="text-gradient">Generator</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Create custom QR codes instantly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl relative z-10"
      >
        {/* We assume QRGenerator component needs some styling updates too, 
            but strictly for this page, we wrap it properly. 
            If QRGenerator has hardcoded styles, we might need to check it. 
            For now, we place it in a nice container. */}
        <div className="glass-card rounded-3xl border border-white/5">
           <QRGenerator />
        </div>
      </motion.div>
    </div>
  );
};

export default QRGeneratorPage;