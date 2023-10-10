import { ProLayout } from "@ant-design/pro-components";

export interface Settings {
  colorPrimary: string;
  layout: "side" | "top";
  contentWidth: "Fluid" | "Fixed";
  fixedHeader: boolean;
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  iconfontUrl: string;
  colorWeak: boolean;
}

export default function Home() {
  return (
    // <Layout>
    //   <Sider>Sider</Sider>
    //   <Layout>
    //     <Header>Header</Header>
    //     <Content>Content</Content>
    //     <Footer>Footer</Footer>
    //   </Layout>
    // </Layout>

    <ProLayout></ProLayout>
  );
}
