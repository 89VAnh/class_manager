import { CLASS_URL, LOGIN_URL } from "~/config/urls";
import AppLayout from "~/layout/AppLayout";
import { ClassPage } from "~/page/Class";
import { LoginPage } from "~/page/Login";
import NotFound from "~/page/NotFound/NotFound";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: CLASS_URL,
        element: <ClassPage />,
      },
    ],
  },
  {
    path: LOGIN_URL,
    element: <LoginPage />,
  },
  { path: "*", element: <NotFound /> },
];

export { routes };
