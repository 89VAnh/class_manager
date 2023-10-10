/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Table } from "antd";
import LoginForm from "./LoginForm";
import "./login.scss";

export default function Login() {
  const columns = [
    {
      title: "TT",
      dataIndex: "orderNum",
      key: "orderNum",
    },
    {
      title: "Đơn vị",
      dataIndex: "departments",
      key: "departments",
      // onCell: (_: any, index: number) => {
      //   switch (index) {
      //     case 0:
      //     case 4:
      //       return { colSpan: 3 };
      //     default:
      //       return {};
      //   }
      // },
    },
    {
      title: "Đầu mối tiếp nhận thông tin, dữ liệu",
      dataIndex: "info",
      key: "info",
      // onCell: (_: any, index: number) => {
      //   switch (index) {
      //     case 0:
      //     case 4:
      //       return { colSpan: 0 };
      //     default:
      //       return {};
      //   }
      // },
    },
    {
      title: "Đầu mối tiếp nhận xử lý nghiệp vụ khác",
      dataIndex: "handle",
      key: "handle",
      // onCell: (_: any, index: number) => {
      //   switch (index) {
      //     case 0:
      //     case 4:
      //       return { colSpan: 0 };
      //     default:
      //       return {};
      //   }
      // },
    },
  ];

  const data = [
    {
      key: "0",
      orderNum: "",
      departments: [],
      info: "",
      handle: "",
    },
    {
      key: "2",
      orderNum: 1,
      departments: ["Khoa Cơ khí", "Khoa Ngoại ngữ"],
      info: "",
      handle: "",
    },
  ];

  const dataSource = data.map((item) => ({
    ...item,
    departments: item.departments.map((dep: string) => "- " + dep).join("\n"),
  }));

  return (
    <Row className='wrapper' style={{ height: "100vh" }}>
      <Col span={4} className='login-left'>
        <div className='school-logo'>
          <img src='/src/assets/images/UTEHY_logo.png' alt='utehy logo' />
        </div>
        <h1 className='login-left_title'>CỔNG THÔNG TIN GIẢNG VIÊN</h1>
      </Col>
      <Col span={20} className='login-right'>
        <div className='login_right_top'>
          <h1 className='login-right_title'>
            TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT HƯNG YÊN <br />
            HUNG YEN UNIVERSITY OF TECHNOLOGY AND EDUCATION
          </h1>
        </div>
        <Row className='login-right_bottom'>
          <Col span={12} className='login-right_bottom_left'>
            <h2 className='login-right_bottom_title'>
              Phân công nhiệm vụ kế hoạch, thời khóa biểu, kết quả học tập
            </h2>
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={columns}
              bordered
            />
          </Col>
          <Col
            span={12}
            className='login-right_bottom_right'
            style={{ display: "flex", justifyContent: "center" }}>
            <div className='login-form-wrapper'>
              <LoginForm />
              <p className='hotline'>
                Hotline hỗ trợ: 0977.522.493 - 0912.681.066 - 0327.211.355 -
                0931.791.888
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
