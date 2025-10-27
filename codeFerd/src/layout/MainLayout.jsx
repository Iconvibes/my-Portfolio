import { Outlet } from "react-router-dom";
import Footer from "../components/UiLayout.jsx/Footer";
import Header from "../components/UiLayout.jsx/Header";


const MainLayout = () => {
  return (
    <div>
       <Header />
       <Outlet />
       <Footer />
    </div>
  );
};

export default MainLayout