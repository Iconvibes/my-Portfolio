import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/UiLayout.jsx/Footer";
import Header from "../components/UiLayout.jsx/Header";

const MainLayout = () => {

  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen relative bg-myBlack overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-myBlack" />
        <div className="absolute -top-48 -left-24 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(59,130,246,0.25),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[560px] h-[560px] bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen text-myWhite">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        { !isLandingPage && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout
