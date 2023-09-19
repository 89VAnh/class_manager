import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";

const columns = [
  { key: 1, label: "STT" },
  { key: 2, label: "Mã HSSV" },
  { key: 3, label: "Họ Tên" },
  { key: 4, label: "Ngày sinh" },
  { key: 5, label: "Tiêu chuẩn 1" },
  { key: 6, label: "Tiêu chuẩn 2" },
  { key: 7, label: "Tiêu chuẩn 3" },
  { key: 8, label: "Tiêu chuẩn 4" },
  { key: 9, label: "Tiêu chuẩn 5" },
  { key: 10, label: "Tổng" },
  { key: 11, label: "Xếp loại" },
];

export default function ConductTable(
  rows: {
    key: string;
    name: string;
    role: string;
    status: string;
  }[]
) {
  return (
    <Table aria-label='Example table with dynamic content'>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
