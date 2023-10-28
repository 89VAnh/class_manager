import {
  AuditOutlined,
  HomeOutlined,
  InfoCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { Image } from "antd";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo/UTEHY_logo.png";
import { CONDUCT_URL, HOME_URL } from "~/config/urls";

import { SearchInput } from "./SearchInput";

const defaultMenus = [
  {
    path: HOME_URL,
    name: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    path: CONDUCT_URL,
    name: "Hạnh kiểm",
    icon: <AuditOutlined />,
  },
];

export const layoutProps: ProLayoutProps = {
  navTheme: "light",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  title: "UTEHY",
  menuItemRender: (item, dom) => <Link to={item.path as string}>{dom}</Link>,
  logo: (
    <Image
      className='logo'
      preview={false}
      src={Logo}
      style={{ maxWidth: 50 }}
    />
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
  onMenuHeaderClick: () => window.open(HOME_URL, "_parent"),
};
