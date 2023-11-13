import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { column, conduct } from "~/model/conduct";
import { ConductsContext } from "~/page/Conduct/Conduct";
import ConductRow from "./ConductRow";
import EditableCell from "./EditableCell";
import "./editable.module.scss";

type Props = {
  columns: column[];
  loading: boolean;
  handleSave: CallableFunction;
};

export default function EditableTable({
  columns,
  loading,
  handleSave,
  ...props
}: Props) {
  const conducts = useContext<conduct[]>(ConductsContext);
  const [dataSource, setDataSource] = useState<conduct[]>([]);

  useEffect(() => {
    setDataSource(conducts);
  }, [conducts]);

  const components = {
    body: {
      row: ConductRow,
      cell: EditableCell,
    },
  };

  columns = columns.map((col: column) => {
    if (col.max !== undefined) {
      return {
        title: col.title,
        align: col.align,
        children: [
          {
            ...col,
            title: col.max.toString(),
          },
        ],
      };
    }
    return col;
  });

  const mapColumns = (col: column) => {
    if (col.children) {
      col.children = col.children.map(mapColumns);
    }

    if (!col.editable) {
      return col;
    }
    const newCol = {
      ...col,
      onCell: (record: conduct) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        max: col.max,
        min: col.min,
        handleSave: handleSave,
      }),
    };

    return newCol;
  };

  columns = columns.map(mapColumns);

  return (
    <div>
      <Table
        pagination={false}
        rowKey={(record) => record.id}
        components={components}
        rowClassName='editable-row'
        bordered
        dataSource={dataSource}
        columns={columns}
        size='small'
        sticky
        loading={loading}
        scroll={{ y: "46rem" }}
        {...props}
      />
    </div>
  );
}
