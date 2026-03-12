import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import Footer from "../components/UiLayout.jsx/Footer";
import Header from "../components/UiLayout.jsx/Header";

const MainLayout = () => {

  const location = useLocation();

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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = gsap.utils.toArray("[data-animate]");

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      });
      return;
    }

    elements.forEach((el) => {
      if (el.dataset.animateInit) return;
      const variant = el.dataset.animate || "fade-up";
      const distance = parseFloat(el.dataset.animateDistance || "56");
      const initial = { opacity: 0, x: 0, y: 0, scale: 0.97, rotate: 0 };

      if (variant === "fade-up") initial.y = distance;
      if (variant === "fade-down") initial.y = -distance;
      if (variant === "fade-left") {
        initial.x = -distance;
        initial.rotate = -2;
      }
      if (variant === "fade-right") {
        initial.x = distance;
        initial.rotate = 2;
      }
      if (variant === "scale") initial.scale = 0.92;
      if (variant === "fade") initial.opacity = 0;

      if (el.dataset.animateScale) {
        initial.scale = parseFloat(el.dataset.animateScale);
      }
      if (el.dataset.animateRotate) {
        initial.rotate = parseFloat(el.dataset.animateRotate);
      }

      gsap.set(el, { ...initial, transformOrigin: "50% 50%", willChange: "transform, opacity" });
      el.dataset.animateInit = "true";
      el.dataset.animateX = `${initial.x}`;
      el.dataset.animateY = `${initial.y}`;
      el.dataset.animateScale = `${initial.scale}`;
      el.dataset.animateRotate = `${initial.rotate}`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const initialX = parseFloat(el.dataset.animateX || "0");
          const initialY = parseFloat(el.dataset.animateY || "0");
          const initialScale = parseFloat(el.dataset.animateScale || "1");
          const initialRotate = parseFloat(el.dataset.animateRotate || "0");

          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              duration: 1.0,
              ease: "power4.out",
              overwrite: "auto"
            });
          } else {
            gsap.to(el, {
              opacity: 0,
              x: initialX,
              y: initialY,
              scale: initialScale,
              rotate: initialRotate,
              duration: 0.5,
              ease: "power2.inOut",
              overwrite: "auto"
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

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
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout
