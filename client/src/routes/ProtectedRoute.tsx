import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import config from "~/config";
import { useAuth } from "~/hook/useAuth";

import { ValidateToken } from "~/service/loginService";

export default function ProtectedRoute() {
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const { user: token } = useAuth();

  useEffect(() => {
    ValidateToken(token)
      .then(() => setIsValidated(true))
      .catch(() => setIsValidated(false));
  }, [token]);

  // return isValidated ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={config.routes.login} replace />
  // );

  return <Outlet />;
}
