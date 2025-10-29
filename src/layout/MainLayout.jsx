import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/UiLayout.jsx/Footer";
import Header from "../components/UiLayout.jsx/Header";
import LightRays from '../components/Ui/LightRays';


const MainLayout = () => {

  const location = useLocation();
  const isLandingPage = location.pathname === '/';


  return (
    <div className="flex flex-col min-h-screen relative bg-myBlack overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#fde4c3"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
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