import { UserOutlined } from "@ant-design/icons";
import { ProList } from "@ant-design/pro-components";
import { Button, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CONDUCT_URL } from "~/config/urls";
import { useSearchClasses } from "~/loader/class.loader";
import { UserState } from "~/store/auth/atom";

export default function Home() {
  const userProfile = useRecoilValue(UserState);

  const { data: classes, isLoading } = useSearchClasses({
    params: {
      pageIndex: 1,
      pageSize: 10,
      FormTeacherId: userProfile.username,
      year: dayjs().year(),
    },
  });

  const data = (classes?.data || []).map(({ id }: { id: string }) => {
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
