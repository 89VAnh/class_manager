import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { LOCAL_USER } from "~/constant/config";
import { Login } from "~/service/user.service";
import storage, { storageService } from "~/utils/storage";
import { RULES_FORM } from "~/utils/validator";
import styles from "./loginForm.module.scss";

export default function LoginForm() {
  const [error, setError] = useState<string>("");

  const onFinish = (user: { username: string; password: string }) => {
    Login(user)
      .then((data) => {
        storage.setToken(data.token);
        storageService.setStorage(LOCAL_USER, JSON.stringify(data));
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <Card
      style={{
        borderColor: "#ddd",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}>
      <h1 className={styles.login_form_title}>CỔNG THÔNG TIN GIẢNG VIÊN</h1>

      <Form
        name='normal_login'
        className={styles.login_form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size='large'>
        <Form.Item name='username' rules={[...RULES_FORM.required]}>
          <Input
            prefix={<UserOutlined className={styles.site_form_item_icon} />}
            placeholder='Tên đăng nhập'
            size='large'
          />
        </Form.Item>
        <Form.Item name='password' rules={[...RULES_FORM.required]}>
          <Input.Password
            prefix={<LockOutlined className={styles.site_form_item_icon} />}
            type='password'
            placeholder='Mật khẩu'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              shape='round'
              style={{ transition: "all .3s ease-in-out" }}
              className={styles.login_form_button}>
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
