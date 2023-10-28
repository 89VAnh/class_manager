import { Breadcrumb } from "antd";
import { useEffect } from "react";
import {
  PathMatch,
  RouteObject,
  matchPath,
  useLocation,
} from "react-router-dom";
import { routes } from "~/routes/routes";
// import config from "~/config";

export default function BreadcrumbDiamic() {
  const location = useLocation();

  const routeMap = [{ path: "/", title: "Trang chủ" }];

  function matchRouteDefinitions(routes: RouteObject[]): PathMatch[] {
    const crumbs: PathMatch[] = [];

    routes.forEach((route) => {
      const match = matchPath(
        { path: route.path ? route.path : "", end: false },
        location.pathname
      );
      if (match) {
        crumbs.push(match);
      }
    });

    return crumbs;
  }

  useEffect(() => {
    console.log(matchRouteDefinitions(routes));
  }, [location]);

  return (
    <Breadcrumb
      items={[
        { title: "Home", href: "/" },
        // { title: "Public", href: "/public" },
      ]}
    />
  );
}
