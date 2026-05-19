import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes";

const App = () => {
  const router = createBrowserRouter(appRoutes);

  return <RouterProvider router={router} />;
};

export default App;
