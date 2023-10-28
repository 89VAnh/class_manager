import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

const Routes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routes;
