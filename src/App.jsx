import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Projects from "./Pages/Projects"
import Contact from "./Pages/Contact"


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    )
  )


  return (
     <RouterProvider router={router} />
  )
}

export default App