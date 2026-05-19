import MainLayout from "./layout/MainLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
export { publicRoutePaths } from "./seo/site";

export const appRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "studio", element: <About /> },
      { path: "work", element: <Projects /> },
      { path: "contact", element: <Contact /> }
    ]
  }
];
