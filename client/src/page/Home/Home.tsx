import { ProList } from "@ant-design/pro-components";
// import { LOCAL_USER } from "~/constant/config";
// import { storageService } from "~/utils/storage";
import { UserOutlined } from "@ant-design/icons";
import { Button, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { CONDUCT_URL } from "~/config/urls";
import { classes } from "./fakedata/fakeData.json";

export default function Home() {
  // const currentUser = storageService.getStorage(LOCAL_USER);
  const data = classes.map(({ id }) => {
    return {
      title: (
        <Typography.Title level={3}>
          <Link to={`class/${id}`}>{id}</Link>
        </Typography.Title>
      ),
      subtitle: <Tag color='#5BD8A6'>v</Tag>,
      actions: [
        <Link to={`${CONDUCT_URL}/${id}`}>
          <Button>Điểm hạnh kiểm</Button>
        </Link>,
      ],
      avatar: <UserOutlined />,
      content: "",
    };
  });

  const headerTitle = (
    <Typography.Title level={2}>DANH SÁCH LỚP HỌC</Typography.Title>
  );

  return (
    <ProList
      // ghost
      // split
      dataSource={data}
      metas={{
        title: {},
        subTitle: {},
        type: {},
        content: {},
        avatar: {},
        actions: { cardActionProps: "extra" },
      }}
      // pagination={{
      //   defaultPageSize: 6,
      // }}
      headerTitle={headerTitle}
      // showActions='hover'
      // grid={{ gutter: 30, column: 1 }}
      // itemCardProps={{ ghost: true }}
      // className={styles.list}
    />
  );
}
