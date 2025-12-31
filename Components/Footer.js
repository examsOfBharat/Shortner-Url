import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="wrapper">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-display font-bold text-white mb-4 block">
              URL <span className="text-primary-500">Shortener</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Simplifying the web, one link at a time. Create, share, and track your links with our powerful platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                <FaGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5 hover:border-white/10">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/qr-generator" className="text-gray-400 hover:text-primary-400 transition-colors">QR Generator</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/AboutUs" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link href="/ContactUs" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link href="/PrivacyPolicy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
          <p className="mt-2">
            Powered by <a href="https://cynerotech.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-400 hover:text-primary-500 transition-colors">Cynerotech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;