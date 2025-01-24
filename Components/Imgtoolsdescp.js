import React from "react";

const ShortUrlDesc = () => {
  return (
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
  );
};

export default ShortUrlDesc;
