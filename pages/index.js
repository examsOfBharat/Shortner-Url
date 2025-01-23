import { useState } from "react";
import "../src/app/globals.css"; 
export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    if (data.shortUrl) {
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex justify-center items-center py-8">
      <div className=" rounded-lg shadow-xl p-8 w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter the URL to shorten"
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition duration-200"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700 mb-2">Your Shortened URL:</p>
            <a
              href={shortUrl}
              className="text-blue-600 hover:text-blue-800 text-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
