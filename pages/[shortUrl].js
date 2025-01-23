// src/app/[shortUrl]/page.js
import { useEffect } from "react";
import dbConnect from "../lib/dbConnect";
import Url from "../models/Url";

// Client-side redirection logic
export default function Redirect({ originalUrl }) {
  useEffect(() => {
    if (originalUrl) {
      // Perform the redirection on the client side
      window.location.href = originalUrl;
    }
  }, [originalUrl]);

  // Show a loading message while redirecting
  return <p>Redirecting... Please wait.</p>;
}

// Fetch the original URL from the database on the server side
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
