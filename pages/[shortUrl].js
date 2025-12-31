// src/app/[shortUrl]/page.js
import { useEffect, useState } from "react";
import dbConnect from "../lib/dbConnect";
import Url from "../models/Url";

export default function Redirect({ originalUrl }) {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (originalUrl) {
      // Simulate a small delay to show the loading spinner before redirecting
      setTimeout(() => {
        window.location.href = originalUrl;
      }, 1000); // Delay of 1 second before redirect
    }
  }, [originalUrl]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Pulsing Logo/Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-primary-500 animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-secondary-500 border-b-transparent animate-spin-reverse opacity-50"></div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-pulse">
            Redirecting...
          </h2>
          <p className="text-gray-500 text-sm mt-2">Please wait while we take you to your destination.</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Connect to the database
    await dbConnect();

    const { shortUrl } = context.params;

    // Find the original URL from the database using the short URL
    const urlDoc = await Url.findOne({ shortUrl });

    // If no URL is found, return 404
    if (!urlDoc) {
      return { notFound: true };
    }

    // Return the original URL to the page component
    return {
      props: {
        originalUrl: urlDoc.originalUrl,
      },
    };
  } catch (error) {
    // Handle any database or unexpected errors
    console.error("Error fetching the URL:", error);
    return { notFound: true }; // If there's an error, show a 404 page
  }
}
