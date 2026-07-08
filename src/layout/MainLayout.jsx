import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_40%)]" />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
