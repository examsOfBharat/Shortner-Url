import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactUs = () => {
    return (
        <div className="py-20 relative">
            <div className="wrapper relative z-10">
                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-6">
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We'd love to hear from you! Reach out to us for any questions, feedback, or partnerships.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass-card p-8 rounded-3xl space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="p-4 rounded-xl bg-primary-500/10 text-primary-500">
                                    <FaEnvelope className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                                    <p className="text-gray-400">support@urlshortener.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6">
                                <div className="p-4 rounded-xl bg-secondary-500/10 text-secondary-500">
                                    <FaPhone className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Phone</h3>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-6">
                                <div className="p-4 rounded-xl bg-accent-500/10 text-accent-500">
                                    <FaMapMarkerAlt className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Office</h3>
                                    <p className="text-gray-400">123 Tech Boulevard, <br />Innovation City, CA 90210</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex gap-4">
                            {[FaTwitter, FaInstagram, FaFacebook, FaLinkedin].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-12 h-12 rounded-xl bg-[#171717] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all"
                                >
                                    <Icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8 md:p-10 rounded-3xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8">Send Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="John Doe"
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    placeholder="How can we help you?"
                                    className="input-field resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;