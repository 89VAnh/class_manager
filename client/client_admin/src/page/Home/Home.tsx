import { UserOutlined } from "@ant-design/icons";
import { ProList } from "@ant-design/pro-components";
import { Button, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONDUCT_URL } from "~/config/urls";
import { LOCAL_USER } from "~/constant/config";
import { getClasses } from "~/service/class.service";
import { storageService } from "~/utils/storage";

export default function Home() {
  const lectureId = storageService.getStorage(LOCAL_USER).username;
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getClasses(lectureId)
      .then((data) => setClasses(data))
      .catch(() => console.log("fail!!!"));

    setIsLoading(false);
  }, [lectureId]);

  const data = classes.map(({ id }: { id: string }) => {
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
      dataSource={data}
      metas={{
        title: {},
        subTitle: {},
        type: {},
        content: {},
        avatar: {},
        actions: { cardActionProps: "extra" },
      }}
      loading={isLoading}
      headerTitle={headerTitle}
    />
  );
}
