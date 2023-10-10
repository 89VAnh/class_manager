import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import config from "~/config";
import { useAuth } from "~/hook/useAuth";

import { ValidateToken } from "~/service/loginService";

export default function NotAuthenticatedRoute() {
  const { user: token } = useAuth();

  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    ValidateToken(token)
      .then(() => setIsValidated(true))
      .catch(() => setIsValidated(false));
  }, [token]);

  // return isValidated ? (
  //   <Navigate to={config.routes.home} replace />
  // ) : (
  //   <Outlet />
  // );

  return <Outlet />;
}
