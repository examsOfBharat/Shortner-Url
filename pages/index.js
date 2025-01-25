import { useState } from "react";
import "../src/app/globals.css";
import Imgtoolsdescp from "../Components/Imgtoolsdescp";
import { MdFileCopy } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";


export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [alias, setAlias] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false); // Track if the new shorten URL button should be active
  const isSmallScreen = useMediaQuery("(max-width: 820px)"); // Define the breakpoint for small devices

  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
  const aliasPattern = /^[a-zA-Z0-9-]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!urlPattern.test(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!aliasPattern.test(alias)) {
      setError("Please enter a valid alias.");
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

      if (res.ok) {
        if (data.shortUrl) {
          setShortUrl(`${window.location.origin}/${data.shortUrl}`);
          setIsButtonActive(true); // Activate the new shorten URL button
        }
      } else {
        setError(data.error || "Error generating short URL. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          alert("Failed to copy the URL.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("Failed to copy the URL. Clipboard may not be supported.");
      }
    }
  };

  const handleNewShortenUrl = () => {
    // Reset all states to allow a new URL to be shortened
    setOriginalUrl("");
    setShortUrl("");
    setAlias("");
    setError("");
    setIsButtonActive(false);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-between">
      <div className="  relative w-full md:h-screen flex justify-evenly items-center md:p-4 lg:p-4 md:bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400">
        <div className="p-8 rounded-3xl shadow-2xl w-full max-w-lg  bg-white ">
          <h1 className="text-6xl p-3 font-serif rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text font-bold text-center mb-8">
            Short URL
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter the link to shorten"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 outline-none shadow-sm"
            />
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Custom Alias (Optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-500 outline-none shadow-sm"
            />

            {error && (
              <p className="text-red-600 text-center text-sm font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-white text-lg font-semibold ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-purple-600"
              }`}
              disabled={loading}
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {shortUrl && isSmallScreen && (
            <div>
              <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-700 mb-4 font-medium">
                  Your Shortened URL:
                </p>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <a
                    href={shortUrl}
                    className="text-blue-600 hover:underline font-medium truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortUrl}
                  </a>
                  {copied ? (
                    <span className="text-green-500 font-medium text-sm ml-4">
                      Copied!
                    </span>
                  ) : (
                    <button
                      onClick={handleCopy}
                      className="text-gray-500 hover:text-blue-500 ml-4 transition-all"
                    >
                      <MdFileCopy className="text-xl" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={handleNewShortenUrl}
                className={`w-full py-3 mt-4 rounded-lg shadow-md text-white text-lg font-semibold ${
                  isButtonActive
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isButtonActive}
              >
                Create New Shorten URL
              </button>
            </div>
          )}
        </div>

        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, x: -200 }} // Start with these properties
            animate={{ opacity: 1, x: 0 }} // Animate to these properties
            transition={{ duration: 1, ease: "easeOut" }} // Define the animation duration and easing
            className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-center"
          >
            <p className="text-gray-700 mb-4 font-medium">
              Your Shortened URL:
            </p>
            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
              <a
                href={shortUrl}
                className="text-blue-600 hover:underline font-medium truncate"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
              {copied ? (
                <span className="text-green-500 font-medium text-sm ml-4">
                  Copied!
                </span>
              ) : (
                <button
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-blue-500 ml-4 transition-all"
                >
                  <MdFileCopy className="text-xl" />
                </button>
              )}
            </div>
            <button
              onClick={handleNewShortenUrl}
              className={`w-full py-3 mt-4 rounded-lg shadow-md text-white text-lg font-semibold ${
                isButtonActive
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isButtonActive}
            >
              Create New Shorten URL
            </button>
          </motion.div>
        )}
      </div>
      {/* =========================================footer section */}
      <div className="text-black py-12">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
            Welcome to Exams of Bharat - Your Ultimate URL Shortener Hub
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Shorten Your Links
              </h3>
              <p className="text-gray-700">
                Easily shorten long URLs to make them manageable and shareable.
                Perfect for social media, emails, and more.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                Customize Short URLs
              </h3>
              <p className="text-gray-700">
                Create personalized short URLs with custom aliases, making your
                links memorable and recognizable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-pink-600 mb-4">
                Track Link Performance
              </h3>
              <p className="text-gray-700">
                Monitor click-through rates of your short links and track their
                performance with insights into user engagement.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Simplify your links and make them easier to share with Exams of
              Bharat's URL Shortener. Visit
              <a
                href="https://examsofbharat.com"
                className="text-blue-500 hover:text-blue-400 ml-1"
              >
                examsofbharat.com
              </a>
              to get started!
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 w-full text-center py-6">
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} Exams of Bharat. All Rights Reserved.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Built with ❤️ by
          <a
            className="text-blue-400 ml-1"
            href="https://www.examsofbharat.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Exams of Bharat
          </a>
        </p>
      </footer>
    </div>
  );
}
