import { SearchOutlined } from "@ant-design/icons";
import { Input, theme } from "antd";

export const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <Input
      style={{
        borderRadius: 4,
        marginInlineEnd: 12,
        border: "1px solid #e8e8e8",
      }}
      prefix={
        <SearchOutlined
          style={{
            color: token.colorTextLightSolid,
          }}
        />
      }
      placeholder='Tìm kiếm'
      bordered={false}
    />
  );
};
