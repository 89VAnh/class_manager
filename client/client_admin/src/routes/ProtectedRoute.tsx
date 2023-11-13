import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_URL } from "~/config/urls";

import { validateToken } from "~/service/user.service";

export default function ProtectedRoute() {
  // return ValidateToken() ? <Outlet /> : <Navigate to={LOGIN_URL} replace />;
  return <Outlet />;
}
