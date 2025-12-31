import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

const Layout = ({ children, title = "URL Shortener | Fast & Secure" }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0a0a] text-gray-100 overflow-x-hidden selection:bg-primary-500/30 selection:text-primary-200 relative">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Fast, secure, and professional URL shortener." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Global Background Glow - subtle noise/texture */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

      <Navbar />
      
      <main className="flex-grow pt-24 relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
