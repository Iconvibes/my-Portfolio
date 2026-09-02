import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CommandPalette from '../components/layout/CommandPalette';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getSeoConfig } from '../seo/site';

const setMetaContent = (attribute, key, value) => {
  const selector = `meta[${attribute}="${key}"]`;
  const meta = document.head.querySelector(selector);
  if (meta) {
    meta.setAttribute('content', value);
  }
};

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
    // Chunk failed to load, prerendered or previously swapped tags stay.
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
      <div className="relative isolate overflow-x-hidden">
        <Header />
        <main id="main-content" className="flex-1 pt-[72px]">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </div>
  );
};

export default MainLayout;
