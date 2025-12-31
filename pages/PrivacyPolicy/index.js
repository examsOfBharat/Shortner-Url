import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="py-20 relative text-gray-400">
      <div className="wrapper relative z-10">
        {/* Headline */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              At Shorturl.org.in, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-gray-200">Personal Information:</strong> Name, email address, etc.</li>
              <li><strong className="text-gray-200">Usage Data:</strong> IP addresses, browser type, pages visited, etc.</li>
              <li><strong className="text-gray-200">Cookies:</strong> Data stored on your device to enhance your experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Usage</h2>
            <p className="mb-2">We use the collected data to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and improve our services.</li>
              <li>Analyze usage patterns to enhance user experience.</li>
              <li>Communicate with you about updates and offers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection</h2>
            <p className="leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption and secure servers. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
            <p className="leading-relaxed">
              We may use third-party services (e.g., Google Analytics) that collect, monitor, and analyze data. These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. User Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access the data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt-out of data collection.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
            <p className="leading-relaxed">
              We use cookies to enhance your experience. You can disable cookies in your browser settings, but this may affect the functionality of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. Policy Updates</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at <Link href="/ContactUs" className="text-primary-500 hover:text-primary-400 font-semibold hover:underline">support@urlshortener.com</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;