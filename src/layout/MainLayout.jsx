import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getSeoConfig } from '../seo/site';

const MainLayout = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const seo = getSeoConfig(location.pathname);
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
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
        <div className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(200,241,53,0.06),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(56,130,246,0.07),transparent_40%)]"
            aria-hidden="true"
          />
          <Header />
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
  );
};

export default MainLayout;
