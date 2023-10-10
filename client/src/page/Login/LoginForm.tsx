import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { useAuth } from "~/hook/useAuth";
import { Login } from "~/service/loginService";
import "./loginForm.scss";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [error, setError] = useState<string>("");

  const onFinish = (user: { username: string; password: string }) => {
    Login(user)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => setError(error));
  };

  const validator = () => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  };

  return (
    <Card
      style={{
        borderColor: "#ddd",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}>
      <h1 className='login-form-title'>CỔNG THÔNG TIN GIẢNG VIÊN</h1>

      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size='large'>
        <Form.Item
          name='username'
          rules={[
            { required: true, message: "Vui lòng điền tên đăng nhập!" },
            { validator },
          ]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Tên đăng nhập'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: "Vui lòng điền mật khẩu!" },
            { validator },
          ]}>
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
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
              className='login-form-button'>
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
