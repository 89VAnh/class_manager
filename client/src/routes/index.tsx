import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CONDUCT_URL, HOME_URL, LOGIN_URL } from "~/config/urls";
import AppLayout from "~/layout/AppLayout";
import Conduct from "~/page/Conduct/Conduct";
import Home from "~/page/Home/Home";
import Login from "~/page/Login/Login";
import NotFound from "~/page/NotFound/NotFound";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: HOME_URL, element: <Home /> },
        {
          path: `${CONDUCT_URL}/:classId`,
          element: <Conduct />,
        },
      ],
    },
    {
      path: LOGIN_URL,
      element: <Login />,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
