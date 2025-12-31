import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdContentCopy, MdCheck, MdLink } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  
  const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
  const aliasPattern = /^[a-zA-Z0-9-]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!urlPattern.test(originalUrl)) {
      setError("Please enter a valid URL");
      return;
    }
    if (!aliasPattern.test(alias)) {
      setError("Alias can only contain letters, numbers, and hyphens");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl, alias }),
      });

      const data = await res.json();

      if (res.ok && data.shortUrl) {
        setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      // Try modern API first (requires secure context HTTPS)
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch (err) {
      // Fallback for older browsers or non-secure contexts (HTTP)
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      
      // Ensure it's not visible but part of DOM
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) setCopied(true);
      } catch (fallbackErr) {
        console.error('Fallback copy failed', fallbackErr);
      }
      
      document.body.removeChild(textArea);
    }
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOriginalUrl("");
    setAlias("");
    setShortUrl("");
    setError("");
    setCopied(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-3xl p-1 md:p-2 max-w-3xl mx-auto w-full"
      id="shorten"
    >
      <div className="bg-[#0a0a0a]/50 rounded-[20px] p-6 md:p-8 border border-white/5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MdLink className="text-gray-500 group-focus-within:text-primary-500 transition-colors text-xl" />
              </div>
              <input
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Paste your long link here"
                className="input-field pl-16"
              />
            </div>
            
            <div className="w-full md:w-1/3 relative">
               <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Alias (Optional)"
                className="input-field"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-sm font-medium px-1"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-500/10 transition-all transform duration-200 ${
              loading 
                ? "bg-gray-700 cursor-not-allowed" 
                : "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 hover:shadow-primary-500/25 active:scale-[0.99]"
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <BiLoaderAlt className="animate-spin text-2xl" />
                <span>Shortening...</span>
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        <AnimatePresence>
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="bg-primary-500/10 border border-primary-500/20 p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 justify-between">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 font-medium truncate block transition-colors flex-1 text-center md:text-left text-lg"
                >
                  {shortUrl}
                </a>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={handleCopy}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all text-sm ${
                      copied
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {copied ? <MdCheck className="text-lg" /> : <MdContentCopy className="text-lg" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-white/5 text-gray-400 font-semibold hover:bg-white/10 hover:text-white transition-colors text-sm border border-transparent hover:border-white/10"
                  >
                    New
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ShortenerForm;
