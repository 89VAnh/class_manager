import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteModal from "~/components/Modal/DeleteModal";
import { CACHE } from "~/loader/cache";
import { useDeleteClass, useSearchClasses } from "~/loader/class.loader";
import { classInfo } from "~/model/classInfo";
import ClassModal from "./components/ClassModal";

export default function Class() {
  const { t } = useTranslation("translation", { keyPrefix: "class" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState({});

  const {
    data: classes,
    isLoading,
    remove,
  } = useSearchClasses({
    params: {
      pageIndex: page,
      pageSize: pageSize,
      year: dayjs().year(),
      ...search,
    },
  });

  useEffect(() => {
    return () => remove();
  }, [remove]);

  const columns: ProColumns<classInfo>[] = [
    {
      dataIndex: "id",
      title: t("fields.id"),
    },
    {
      dataIndex: "name",
      title: t("fields.name"),
    },
    {
      dataIndex: "formTeacher",
      title: t("fields.formTeacher"),
      search: false,
    },
    {
      dataIndex: "department",
      title: t("fields.department"),
      search: false,
    },
    {
      title: t("fields.actions"),
      dataIndex: "action",
      width: 100,
      align: "center",
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <ClassModal id={record?.id} isCreate={false} />
            <DeleteModal
              id={record?.id}
              useDelete={useDeleteClass}
              cache={CACHE.CLASS}
              t={t}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable<classInfo>
      headerTitle={t("title")}
      dataSource={classes ? classes.data : []}
      loading={isLoading}
      columns={columns}
      rowKey={"id"}
      pagination={{
        defaultPageSize: 10,
        onChange(page, pageSize) {
          setPage(page);
          setPageSize(pageSize);
        },
        total: classes ? classes.totalItems : 0,
        showLessItems: false,
        showTotal() {
          return "";
        },
      }}
      onSubmit={setSearch}
    />
  );
}
