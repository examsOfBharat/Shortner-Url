import { useState } from "react";
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
      <div className="relative w-full md:h-screen flex flex-col md:flex-row lg:flex-row justify-evenly items-center md:p-6 lg:p-8 md:bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400">
        <div className="p-8 rounded-3xl shadow-2xl w-full max-w-lg bg-white">
          <h1 className="text-5xl sm:text-6xl p-3 font-serif rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text font-bold text-center mb-8">
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
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="mr-3 animate-spin text-white w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="opacity-25"
                    ></circle>
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0"
                      className="opacity-75"
                    ></path>
                  </svg>
                  Shortening URL…
                </div>
              ) : (
                "Shorten URL"
              )}
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

        {shortUrl && !isSmallScreen && (
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

      {/* =====================Footer section================*/}
      <Imgtoolsdescp />
    </div>
  );
}
