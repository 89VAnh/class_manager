import { HOME_URL, LOGIN_URL } from "~/config/urls";
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
    path: "/",
    element: <NotAuthenticatedRoute />,
    children: [{ path: LOGIN_URL, element: <Login /> }],
  },
];

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ path: HOME_URL, element: <Home /> }],
  },
];

export {
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
  routesForPublic,
};
