import React from "react";
const ShortUrlDesc = () => {
  return (
    <section>
      <div className="text-black py-12">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-8">
            Welcome to shorturl - Your Ultimate URL Shortener Hub
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
          © {new Date().getFullYear()} shorturl. All Rights Reserved.
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Built with ❤️ by
          <a
            className="text-blue-400 ml-1"
            href="https://www.shorturl.org.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            shorturl.org.in
          </a>
        </p>
      </footer>
    </section>
  );
};

export default ShortUrlDesc;
