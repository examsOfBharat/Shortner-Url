import React from 'react';
import Image from 'next/image';
import { FaRocket, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white py-16 rounded-b-lg">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            About Shorturl.org.in
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Simplifying links, one click at a time.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto">
            At Shorturl.org.in, our mission is to make sharing links easier, faster, and more efficient. We believe that every link should be simple, memorable, and secure.
          </p>
        </div>

        {/* Features and Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaRocket className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-400">
                Generate short links instantly with 99.9% uptime.
              </p>
            </div>
            <div className="text-center">
              <FaChartLine className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Link Analytics</h3>
              <p className="text-gray-400">
                Track clicks, locations, and more with detailed analytics.
              </p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Links</h3>
              <p className="text-gray-400">
                Protect your links with advanced security features.
              </p>
            </div>
            <div className="text-center">
              <FaUsers className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-gray-400">
                Designed for everyone, from individuals to businesses.
              </p>
            </div>
          </div>
        </div>

    

      
      </div>
    </div>
  );
};

export default AboutUs;