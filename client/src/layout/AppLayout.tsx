import { ProLayout } from "@ant-design/pro-components";

import { Outlet, useLocation } from "react-router-dom";

import "~/assets/scss/index.scss";
// import BreadcrumbDiamic from "~/components/Breadcrum/BreadcrumDiamic";
import { layoutProps } from "./LayoutProps";

interface Props {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: Props): JSX.Element {
  const location = useLocation();
  // console.log(location);

  return (
    <ProLayout location={location} {...layoutProps}>
      {/* <PageContainer> */}
      {/* <BreadcrumbDiamic /> */}
      <Outlet />
      {children}
      {/* </PageContainer> */}
    </ProLayout>
  );
}
