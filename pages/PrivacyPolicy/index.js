import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="max-w-3xl mx-auto text-gray-400">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
          <p className="mb-6">
            At Shorturl.org.in, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">2. Data Collection</h2>
          <p className="mb-6">
            We may collect the following types of information:
            <ul className="list-disc list-inside mt-2">
              <li>Personal Information: Name, email address, etc.</li>
              <li>Usage Data: IP addresses, browser type, pages visited, etc.</li>
              <li>Cookies: Data stored on your device to enhance your experience.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">3. Data Usage</h2>
          <p className="mb-6">
            We use the collected data to:
            <ul className="list-disc list-inside mt-2">
              <li>Provide and improve our services.</li>
              <li>Analyze usage patterns to enhance user experience.</li>
              <li>Communicate with you about updates and offers.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">4. Data Protection</h2>
          <p className="mb-6">
            We implement industry-standard security measures to protect your data, including encryption and secure servers. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
          <p className="mb-6">
            We may use third-party services (e.g., Google Analytics) that collect, monitor, and analyze data. These services have their own privacy policies, and we encourage you to review them.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">6. User Rights</h2>
          <p className="mb-6">
            You have the right to:
            <ul className="list-disc list-inside mt-2">
              <li>Access the data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt-out of data collection.</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
          <p className="mb-6">
            We use cookies to enhance your experience. You can disable cookies in your browser settings, but this may affect the functionality of our services.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">8. Policy Updates</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact us at <Link href="/contact" className="text-purple-500 hover:underline">support@shorturl.org.in</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;