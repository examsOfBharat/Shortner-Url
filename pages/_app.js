import "../styles/globals.css";
// Layout is handled in individual pages or can be wrapped here if it persists across ALL pages.
// Given strict unification, let's wrap everything in Layout here to enforce ensuring clean structure.
// But some pages might need custom Layouts. For now, let's keep it simple and clean.
// Using the unified Layout in _app.js guarantees consistency.

import Layout from "../Components/Layout";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

// Bind NProgress to Router events
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isRedirectPage = router.pathname === '/[shortUrl]';

  if (isRedirectPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
