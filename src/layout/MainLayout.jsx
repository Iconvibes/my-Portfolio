import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CommandPalette from '../components/layout/CommandPalette';
import CustomCursor from '../components/layout/CustomCursor';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getSeoConfig } from '../seo/site';

const setMetaContent = (attribute, key, value) => {
  const selector = `meta[${attribute}="${key}"]`;
  const meta = document.head.querySelector(selector);
  if (meta) {
    meta.setAttribute('content', value);
  }
};

// Lightweight tag sync — no extra network: getSeoConfig needs only the route
// table + site config, which are already in the shared bundle.
const syncBaseTags = (pathname) => {
  const seo = getSeoConfig(pathname);

  document.title = seo.title;
  setMetaContent('name', 'description', seo.description);
  setMetaContent('property', 'og:title', seo.title);
  setMetaContent('property', 'og:description', seo.socialDescription);
  setMetaContent('property', 'og:url', seo.canonical);
  setMetaContent('name', 'twitter:title', seo.title);
  setMetaContent('name', 'twitter:description', seo.socialDescription);

  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', seo.canonical);
  }
};

// JSON-LD swap needs the schema builders, which pull in content modules — keep
// them in a lazily loaded chunk (src/seo/schemas.js) so the first paint never
// pays for them. First load is skipped entirely: the prerendered head already
// carries this route's structured data.
const syncJsonLd = async (pathname, token) => {
  try {
    const { buildStructuredData } = await import('../seo/schemas');
    if (token.cancelled) {
      return;
    }
    const schemas = buildStructuredData(pathname);
    const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema).replaceAll('<', '\\u003c');
      document.head.appendChild(script);
    });
  } catch {
    // Chunk failed to load — the prerendered (or previously swapped) tags stay;
    // the next navigation retries.
  }
};

const MainLayout = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const isFirstRun = useRef(true);

  useEffect(() => {
    syncBaseTags(location.pathname);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return undefined;
    }

    // Cancel any in-flight swap from a previous navigation so rapid clicks
    // can't apply a stale route's structured data.
    const token = { cancelled: false };
    syncJsonLd(location.pathname, token);
    return () => {
      token.cancelled = true;
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [location.pathname, prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-signal-ink"
      >
        Skip to main content
      </a>
      <div className="relative isolate overflow-x-clip">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(200,241,53,0.06),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(56,130,246,0.07),transparent_40%)]"
          aria-hidden="true"
        />
        <Header />
        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <CommandPalette />
      <CustomCursor />
    </div>
  );
};

export default MainLayout;
