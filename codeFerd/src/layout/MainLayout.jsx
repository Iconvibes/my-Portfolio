import { Outlet } from "react-router-dom";
import Footer from "../components/UiLayout.jsx/Footer";
import Header from "../components/UiLayout.jsx/Header";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
       <Header />
       <main className="flex-1">
         <Outlet />
       </main>
       <Footer />
    </div>
  );
};

export default MainLayout