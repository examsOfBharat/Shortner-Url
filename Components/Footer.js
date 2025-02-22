import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaInstagram, FaXTwitter, FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <footer
      className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-2xl"
      style={{ boxShadow: "0 -5px 10px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <div onClick={handleClick} className="cursor-pointer">
              <h2 className="text-5xl sm:text-6xl p-3 font-serif rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text font-bold text-center mb-8">
                Short URL
              </h2>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* The Company */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                The Company
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/AboutUs" className="text-gray-400 hover:text-white transition duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/ContactUs" className="text-gray-400 hover:text-white transition duration-300">
                    Contact Us
                  </Link>
                </li>
                
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Legal
              </h2>
              <ul className="space-y-4">
                <li>
                  <Link href="/PrivacyPolicy" className="text-gray-400 hover:text-white transition duration-300">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Newsletter
              </h2>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Copyright */}
          <span className="text-sm text-gray-400 sm:text-center">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Cynerotech™
            </a>
            . All Rights Reserved.
          </span>

          {/* Social Media Icons */}
          {/* <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://x.com/examsOfBharat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaXTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://www.instagram.com/examsofbharat/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaInstagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://whatsapp.com/channel/0029VakHgdY2ZjCnrUXThf2p"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a
              href="https://chat.whatsapp.com/B5xTZwLwbzLF09DiTQZd9K"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaFacebook className="w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://youtube.com/@examsofbharat?si=AhmPZHxkqq-hTIaq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <IoLogoYoutube className="w-5 h-5" />
              <span className="sr-only">YouTube</span>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;