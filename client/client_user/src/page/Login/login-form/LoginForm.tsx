import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Card, notification } from "antd";
import { HOME_URL } from "~/config/urls";
import { LOCAL_USER } from "~/constant/config";
import { Login } from "~/service/user.service";
import storage, { storageService } from "~/utils/storage";
import { RULES_FORM } from "~/utils/validator";
import styles from "./loginForm.module.scss";

export default function LoginForm() {
  const handleLogin = async (user: { username: string; password: string }) => {
    try {
      const data = await Login(user);
      storage.setToken(data.token);
      storageService.setStorage(LOCAL_USER, JSON.stringify(data));
      window.open(HOME_URL, "_parent");
    } catch (e) {
      notification.error({ ...(e as { message: string }), placement: "top" });
    }
  };

  return (
    <Card
      style={{
        borderColor: "#ddd",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}>
      <h1 className={styles.login_form_title}>CỔNG THÔNG TIN GIẢNG VIÊN</h1>

      <ProForm
        name='login'
        className={styles.login_form}
        initialValues={{ remember: true }}
        submitter={{
          render: (props) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type='primary'
                size='large'
                shape='round'
                style={{ transition: "all .3s ease-in-out" }}
                className={styles.login_form_button}
                onClick={() => {
                  const values = props.form?.getFieldsValue();
                  handleLogin(values);
                }}>
                Đăng nhập
              </Button>
            </div>
          ),
        }}
        size='large'>
        <ProFormText
          name='username'
          rules={[...RULES_FORM.required]}
          placeholder='Tên đăng nhập'
          fieldProps={{
            prefix: <UserOutlined className={styles.site_form_item_icon} />,
          }}
        />
        <ProFormText.Password
          name='password'
          rules={[...RULES_FORM.required]}
          placeholder='Mật khẩu'
          fieldProps={{
            prefix: <LockOutlined className={styles.site_form_item_icon} />,
          }}
        />
      </ProForm>
    </Card>
  );
}
