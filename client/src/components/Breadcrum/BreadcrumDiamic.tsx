import { Breadcrumb } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import config from "~/config";

export default function BreadcrumbDiamic() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
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
