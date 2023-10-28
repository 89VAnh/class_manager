import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import BreadcrumbDiamic from "~/components/Breadcrum/BreadcrumDiamic";

export default function Home() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <BreadcrumbDiamic />
        <Content>Public</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}
