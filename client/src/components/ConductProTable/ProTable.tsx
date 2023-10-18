import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from "@ant-design/pro-components";
import { Button } from "antd";
import React, { useContext, useState } from "react";
import { column, conduct } from "~/model/conduct";
import { ConductsContext } from "~/page/Conduct/Conduct";

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  children?: DataSourceType[];
};

type Props = { handleSave: CallableFunction };

export default function ConductProTable({ handleSave }: Props) {
  const conducts = useContext<conduct[]>(ConductsContext);

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    conducts.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<readonly conduct[]>(
    () => conducts
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "活动名称",
      dataIndex: "title",
      width: "30%",
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: "此项是必填项",
          },
          {
            message: "必须包含数字",
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: "最长为 16 位",
          },
          {
            min: 6,
            whitespace: true,
            message: "最小为 6 位",
          },
        ],
      },
    },
    {
      title: "状态",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
        },
      },
    },
    {
      title: "描述",
      dataIndex: "decs",
    },
    {
      title: "操作",
      valueType: "option",
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<conduct>
        headerTitle='可编辑表格'
        columns={columns}
        rowKey='id'
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: "dataSource",
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type='primary'
              key='save'
              onClick={() => {
                console.log(dataSource);
              }}>
              Save
            </Button>,
          ];
        }}
        editable={{
          type: "single",
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title='card' headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode='read'
          valueType='jsonCode'
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
}
