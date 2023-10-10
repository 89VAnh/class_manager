import config from "~/config";
import Home from "~/page/Home/Home";
import Login from "~/page/Login/Login";
import NotFound from "~/page/NotFound/NotFound";
import Public from "~/page/Public/Public";
import NotAuthenticatedRoute from "./NotAuthenticatedRoute";
import ProtectedRoute from "./ProtectedRoute";

const routesForPublic = [
  { path: "public", element: <Public /> },
  { path: "*", element: <NotFound /> },
];
const routesForNotAuthenticatedOnly = [
  {
    element: <NotAuthenticatedRoute />,
    children: [{ path: config.routes.login, element: <Login /> }],
  },
];
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ path: config.routes.home, element: <Home /> }],
  },
];

export {
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
  routesForPublic,
};
