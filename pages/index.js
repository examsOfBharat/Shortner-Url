import { useState } from "react";
import "../src/app/globals.css";
import Imgtoolsdescp from "../Components/Imgtoolsdescp";
// import { FaRegCopy } from "react-icons/fa6";
import { MdFileCopy } from "react-icons/md";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copying, setCopying] = useState(false); // Track if URL is being copied
  const [copied, setCopied] = useState(false); // Track if URL is copied
  const [alias,setAlias]=useState("");

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
        body: JSON.stringify({ originalUrl, alias }), // Send the original URL to the server
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center justify-between">
      <div className="p-8 rounded-3xl shadow-2xl w-full max-w-lg mt-10 bg-white">
        <h1 className="text-6xl font-serif rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text font-bold text-center mb-8">
          Short URL
        </h1>

        <p className="text-center text-xl font-medium text-gray-600 mb-8">
          Paste your URL below and make it short & sweet
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter the link to shorten"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Custom Alias (Optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-500 outline-none shadow-sm"
            />
          </div>

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
            } `}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-white border-t-blue-500 rounded-full animate-spin mr-2"></div>
                Shortening...
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 bg-gray-100 relative overflow-hidden p-6 rounded-lg shadow-md text-center">
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
        )}
      </div>

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
