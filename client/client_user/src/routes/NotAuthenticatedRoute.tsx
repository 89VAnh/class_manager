import { Navigate, Outlet } from "react-router-dom";
import { HOME_URL } from "~/config/urls";

import { validateToken } from "~/service/user.service";

export default function NotAuthenticatedRoute() {
  // return ValidateToken() ? <Navigate to={HOME_URL} replace /> : <Outlet />;
  return <Outlet />;
}
