import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'QR Generator', href: '/qr-generator' },
    { name: 'About Us', href: '/AboutUs' },
    { name: 'Contact', href: '/ContactUs' },
  ];

  const isHomePage = router.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isOpen || !isHomePage ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="wrapper flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-display font-bold text-white tracking-wide">
          URL <span className="text-primary-500">Shortener</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-all duration-200 hover:text-primary-400 ${
                router.pathname === link.href ? 'text-primary-500' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#shorten"
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium p-3 rounded-lg hover:bg-white/5 ${
                    router.pathname === link.href ? 'text-primary-500 bg-white/5' : 'text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
