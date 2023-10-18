import {
  HomeOutlined,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { Dropdown, Image } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo/UTEHY_logo.png";
import { HOME_URL } from "~/config/urls";
import { SearchInput } from "./SearchInput";

const defaultMenus = [
  {
    path: HOME_URL,
    name: "Home",
    icon: <HomeOutlined />,
  },
];

const avatarProps = {
  src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
  title: "Việt Anh",
  render: (_: unknown, dom: ReactNode) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
            },
          ],
        }}>
        {dom}
      </Dropdown>
    );
  },
};

export const layoutProps: ProLayoutProps = {
  navTheme: "light",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  title: "UTEHY",
  menuItemRender: (item, dom) => <Link to={item.path as string}>{dom}</Link>,
  logo: (
    <Link to={HOME_URL}>
      <Image
        className='logo'
        preview={false}
        src={Logo}
        style={{ maxWidth: 50 }}
      />
    </Link>
  ),
  menu: { request: async () => defaultMenus },
  actionsRender: (props) => {
    if (props.isMobile) return [];
    if (typeof window === "undefined") return [];
    return [
      props.layout !== "side" && document.body.clientWidth > 1400 ? (
        <SearchInput />
      ) : undefined,
      <InfoCircleFilled key='InfoCircleFilled' />,
      <QuestionCircleFilled key='QuestionCircleFilled' />,
    ];
  },
  avatarProps,
};
