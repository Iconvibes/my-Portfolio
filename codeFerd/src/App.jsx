import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import LandingPage from "./Pages/LandingPage"


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<LandingPage />} />
      </Route>
    )
  )


  return (
     <RouterProvider router={router} />
  )
}

export default App