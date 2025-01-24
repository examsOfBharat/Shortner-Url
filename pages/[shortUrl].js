// src/app/[shortUrl]/page.js
import { useEffect, useState } from "react";
import dbConnect from "../lib/dbConnect";
import Url from "../models/Url";
import "../src/app/globals.css";

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 p-4">
      <div className="flex flex-col items-center text-white text-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>{" "}
        {/* Spinner */}
        <p className="text-xl font-semibold">Redirecting...</p>
        <p className="text-lg">Please wait while we take you there.</p>
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
