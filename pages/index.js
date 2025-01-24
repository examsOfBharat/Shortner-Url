import { useState } from "react";
import "../src/app/globals.css";
// import { FaRegCopy } from "react-icons/fa6";
import { MdFileCopy } from "react-icons/md";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copying, setCopying] = useState(false); // Track if URL is being copied
  const [copied, setCopied] = useState(false); // Track if URL is copied

  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error state

    // Check if the URL pattern is valid
    if (!urlPattern.test(originalUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      // Send the POST request to the API to shorten the URL
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }), // Send the original URL to the server
      });

      const data = await res.json();

      if (res.ok) {
        // If a short URL is returned, update the state with it
        if (data.shortUrl) {
          setShortUrl(`${window.location.origin}/${data.shortUrl}`);
        }
      } else {
        // If an error occurs (e.g., URL is not valid or a server error)
        setError(data.error || "Error generating short URL. Please try again.");
      }
    } catch (err) {
      // Handle network errors or other failures
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false); // Reset the loading state after the request is completed
    }
  };

  // Function to copy the URL to clipboard
  const handleCopy = () => {
    if (navigator.clipboard) {
      // Use Clipboard API if available
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          setCopied(true); // Set copied state to true
          setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        })
        .catch(() => {
          alert("Failed to copy the URL.");
        });
    } else {
      // Fallback to using document.execCommand for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true); // Set copied state to true
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      } else {
        alert("Failed to copy the URL. Clipboard may not be supported.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-lg mt-3">
        <h1
          className="text-5xl bg-gray-500 p-5 font-serif rounded-2xl bg-opacity-40 font-bold text-center mb-6 
  text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500"
        >
          Short URL
        </h1>

        <p className="text-center text-4xl font-serif font-semibold text-gray-600 mb-10">
          Paste the URL to be shortened
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter the link here"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {error && (
              <p className="text-red-500 text-sm absolute -bottom-5 left-0">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-md ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white text-lg font-semibold`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-white border-t-blue-600 rounded-full animate-spin mr-2"></div>
                Shortening...
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-gray-200 relative overflow-hidden  p-4 rounded-md text-center">
            <p className="text-gray-700 mb-2">Your Shortened URL:</p>
            {copied ? (
              <span className="ml-2 text-green-500 text-lg font-medium">
                Copied!
              </span>
            ) : (
              <button
                onClick={handleCopy}
                className="absolute right-0 top-0 p-2 text-2xl rounded-md"
              >
                <MdFileCopy />
              </button>
            )}

            <div className="flex justify-center items-center space-x-4">
              <a
                href={shortUrl}
                className="text-blue-600 hover:underline text-lg font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </div>
            {/* Optional: Show message while copying */}
            {copying && <p className="text-green-500 mt-2">Copied!</p>}
          </div>
        )}
      </div>

      {/* Imgtoolsdescp Section */}
      <footer className="text-black py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-blue-500 mb-8">
            Welcome to Exams of Bharat - Your Ultimate URL Shortener Hub
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Shorten Your Links
              </h3>
              <p className="text-gray-700">
                Easily shorten long URLs to make them more manageable and
                shareable. Perfect for social media, emails, and more.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Customize Short URLs
              </h3>
              <p className="text-gray-700">
                Create personalized short URLs with custom aliases to match your
                brand or campaign, making your links memorable and recognizable.
              </p>
              {/* hello siku */}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Track Link Performance
              </h3>
              <p className="text-gray-700">
                Monitor the click-through rates of your short links and track
                their performance with analytics, giving you insights into user
                engagement.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Simplify your links and make them easier to share with Exams of
              Bharat's URL Shortener. Visit{" "}
              <a
                href="https://examsofbharat.com"
                className="text-blue-500 hover:text-blue-400"
              >
                examsofbharat.com
              </a>{" "}
              to get started!
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Section */}
      <footer className="bg-gray-800 w-full text-center py-4 mt-10">
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} URL Shortener. All Rights Reserved.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Built with ❤️ by{" "}
          <a
            className="text-blue-400"
            href="https://www.examsofbharat.com/"
            target="_blank"
          >
            examsofbharat
          </a>
        </p>
      </footer>
    </div>
  );
}
