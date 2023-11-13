import { ModalForm, ProFormText, ProLayout } from "@ant-design/pro-components";
import { Outlet, useLocation } from "react-router-dom";

import "~/assets/scss/index.scss";
// import BreadcrumbDiamic from "~/components/Breadcrum/BreadcrumDiamic";
import { KeyOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import { ReactNode, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { LOCAL_USER } from "~/constant/config";
import { authorization, changePassword } from "~/service/user.service";
import { UserState } from "~/store/auth/atom";
import { useDisclosure } from "~/utils/modal";
import { storageService } from "~/utils/storage";
import { Logout } from "~/utils/user";
import { RULES_FORM } from "~/utils/validator";
import { layoutProps } from "./LayoutProps";

interface Props {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: Props): JSX.Element {
  const location = useLocation();
  const { open, isOpen, toggle } = useDisclosure();

  const [userProfile, setUserProfile] = useRecoilState(UserState);
  const resetUserProfile = useResetRecoilState(UserState);

  useEffect(() => {
    (async () => {
      const userLocal = storageService.getStorage(LOCAL_USER);
      if (!userLocal.username) {
        resetUserProfile();
        return;
      }
      const user = await authorization();
      if (user) setUserProfile(userLocal);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatarProps = {
    src: "https://th.bing.com/th/id/OIP.7Wfxa-yuK2YA2RIXxA3mEgHaHa?pid=ImgDet&rs=1",
    title: userProfile.fullname,
    render: (_: unknown, dom: ReactNode) => {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: "chagePw",
                icon: <KeyOutlined />,
                label: "Đổi mật khẩu",
                onClick: () => open,
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
        open={isOpen}
        submitter={{
          searchConfig: {
            submitText: "Đổi mật khẩu",
            resetText: "Huỷ",
          },
        }}
        onOpenChange={toggle}
        onFinish={async (value: Record<string, string>) => {
          try {
            await changePassword({
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
