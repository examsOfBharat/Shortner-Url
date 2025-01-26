import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Global SEO Settings */}
      <Head>
        <title>Chota Url Creater</title> {/* Default Title */}
        <meta
          name="description"
          content="Transform long, cumbersome URLs into short, easy-to-share links with our URL Shortener. Built using modern web technologies like Next.js and MongoDB, this tool provides a fast, reliable, and user-friendly experience for managing your links. Whether you're a business looking to track clicks or an individual simplifying your sharing process."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Your Name or Company" />
        <meta name="keywords" content="url shortener, seo, shortener" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Render the current page */}
      <Component {...pageProps} />
    </>
  );
}
