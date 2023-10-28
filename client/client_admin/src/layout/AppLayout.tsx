import { ModalForm, ProFormText, ProLayout } from "@ant-design/pro-components";
import { Outlet, useLocation } from "react-router-dom";

import "~/assets/scss/index.scss";
// import BreadcrumbDiamic from "~/components/Breadcrum/BreadcrumDiamic";
import { KeyOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { ReactNode, useState } from "react";
import { LOCAL_USER } from "~/constant/config";
import { ChangePassword } from "~/service/user.service";
import { storageService } from "~/utils/storage";
import { Logout } from "~/utils/user";
import { RULES_FORM } from "~/utils/validator";
import { layoutProps } from "./LayoutProps";

interface Props {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: Props): JSX.Element {
  const location = useLocation();
  const [isChangePw, setIsChangePw] = useState(false);

  const avatarProps = {
    src: "https://th.bing.com/th/id/OIP.7Wfxa-yuK2YA2RIXxA3mEgHaHa?pid=ImgDet&rs=1",
    title: storageService.getStorage(LOCAL_USER).name,
    render: (_: unknown, dom: ReactNode) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "chagePw",
                icon: <KeyOutlined />,
                label: "Đổi mật khẩu",
                onClick: () => setIsChangePw(true),
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Đăng xuất",
                onClick: Logout,
              },
            ],
          }}>
          {dom}
        </Dropdown>
      );
    },
  };

  return (
    <ProLayout location={location} avatarProps={avatarProps} {...layoutProps}>
      {/* <BreadcrumbDiamic /> */}
      <Outlet />
      {children}
      <ModalForm
        width={450}
        autoFocusFirstInput
        title='Đổi mật khẩu'
        open={isChangePw}
        submitter={{
          searchConfig: {
            submitText: "Đổi mật khẩu",
            resetText: "Huỷ",
          },
        }}
        onOpenChange={setIsChangePw}
        onFinish={async (value: Record<string, string>) => {
          try {
            await ChangePassword({
              ...value,
              username: storageService.getStorage(LOCAL_USER).username,
            });
            message.success("Đổi mật khẩu thành công!");
            return true;
          } catch (e) {
            message.error(e as string);
            return false;
          }
        }}>
        <ProFormText.Password
          name='password'
          label='Mật khẩu hiện tại'
          placeholder='Mật khẩu hiện tại'
          rules={[
            ...RULES_FORM.required,
            {
              validator(_, value) {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới không được trùng với mật khẩu cũ")
                );
              },
            },
          ]}
        />
        <ProFormText.Password
          name='new_password'
          label='Mật khẩu mới'
          placeholder='Mật khẩu mới'
          rules={[
            ...RULES_FORM.required,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu mới không được trùng với mật khẩu cũ")
                );
              },
            }),
          ]}
        />
        <ProFormText.Password
          name='re_new_password'
          label='Nhập lại mật khẩu mới'
          placeholder='Nhập lại mật khẩu mới'
          rules={[
            ...RULES_FORM.required,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu nhập lại không trùng khớp")
                );
              },
            }),
          ]}
        />
      </ModalForm>
    </ProLayout>
  );
}
