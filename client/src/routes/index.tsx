import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
  routesForPublic,
} from "./routes";

const Routes = () => {
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
