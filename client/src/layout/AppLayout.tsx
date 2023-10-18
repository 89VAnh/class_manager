import { ProLayout } from "@ant-design/pro-components";

import { Outlet, useLocation } from "react-router-dom";

import "~/assets/scss/index.scss";
import { layoutProps } from "./LayoutProps";

interface Props {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: Props): JSX.Element {
  const location = useLocation();

  return (
    <ProLayout location={location} {...layoutProps}>
      {/* <PageContainer> */}
      <Outlet />
      {children}
      {/* </PageContainer> */}
    </ProLayout>
  );
}
