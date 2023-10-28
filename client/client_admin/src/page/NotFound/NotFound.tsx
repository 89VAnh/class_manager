import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Xin lỗi, đường dẫn không tồn tại!'
      extra={
        <Button type='primary' onClick={backHome}>
          Trở lại trang chủ
        </Button>
      }
    />
  );
}
