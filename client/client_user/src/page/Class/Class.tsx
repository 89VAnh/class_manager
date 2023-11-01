import { FileExcelOutlined } from "@ant-design/icons";
import {
  ProColumns,
  ProForm,
  ProFormSelect,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Col, Row, Space, Typography, notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { student } from "~/model/student";

import TranscriptDragger from "~/components/TranscriptDragger/TranscriptDragger";
import { exportConductFile } from "~/service/conduct.service";
import { getStudentOfClass } from "~/service/student.service";
import { formatDateShow } from "~/utils/format-string";
import styles from "./class.module.scss";

export default function Class() {
  const currentYear = dayjs().year();

  const { classId } = useParams();
  const [semester, setSemester] = useState<number | undefined>(
    dayjs().month() >= 8 ? 1 : 2
  );
  const [schoolYear, setSchoolYear] = useState<string | undefined>(
    dayjs().month() >= 8
      ? `${currentYear}-${currentYear + 1}`
      : `${currentYear - 1}-${currentYear}`
  );
  const [student, setStudent] = useState<student[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentContext, setStudentContext] = useState<student[]>([]);

  const [monitorId, setMonitorId] = useState<string | undefined>(undefined);

  // School year drowdown
  const lenght = 6;

  const schoolYearOptions = [...Array(lenght)].map((_, index) => {
    const y = currentYear - index;
    const schoolYear = `${y}-${y + 1}`;

    return schoolYear;
  });

  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, semester, schoolYear]);

  const loadStudent = async () => {
    setLoading(true);

    if (classId && semester && schoolYear) {
      const data: student[] = await getStudentOfClass({
        classId,
        semester,
        schoolYear,
      });

      setStudent(data);
      setStudentContext(data);
    }

    setLoading(false);
  };

  const cols: ProColumns<student>[] = [
    {
      dataIndex: "id",
      title: "Mã SV",
      width: 50,
    },
    {
      dataIndex: "name",
      title: "Tên",
    },
    {
      dataIndex: "birthday",
      title: "Ngày sinh",
      valueType: "date",
      render(_, student) {
        return (
          <Typography.Text>
            {dayjs(`${student.birthday}`).format(formatDateShow)}
          </Typography.Text>
        );
      },
      search: false,
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "phone",
      title: "SĐT",
    },
    {
      dataIndex: "address",
      title: "Địa chỉ",
      width: 500,
    },
    {
      dataIndex: "actions",
      render: (_, record) => {
        return (
          <Space>
            {/* <UpdateModal id={record?.id} isCreate={false} />
            <DeleteModal id={record?.id} /> */}
          </Space>
        );
      },
    },
  ];

  // const saveConducts = async () => {
  //   try {
  //     updateConducts(
  //       conducts.filter(
  //         (c, i) => JSON.stringify(c) !== JSON.stringify(conductsContext[i])
  //       )
  //     );
  //     notification.success({ message: "Lưu thông tin thành công!" });
  //   } catch {
  //     notification.error({ message: "Lưu thất bại!" });
  //   }
  // };

  const exportFile = async () => {
    if (JSON.stringify(student) !== JSON.stringify(studentContext)) {
      notification.warning({
        message: "Vui lòng lưu thay đổi trước khi xuất file!",
      });
      return;
    }

    if (semester && classId && schoolYear && monitorId) {
      await exportConductFile({
        semester,
        classId,
        schoolYear,
        monitorId,
      });
      notification.success({ message: "Xuất file thành công!" });
    } else notification.warning({ message: "Vui lòng chọn đầy đủ thông tin!" });
  };

  return (
    <>
      <Typography.Title level={1}>DANH SÁCH LỚP {classId}</Typography.Title>
      <ProForm submitter={false} autoFocusFirstInput className={styles.form}>
        <Row justify='space-between'>
          <Col className={styles.selections}>
            <Space size='large'>
              <ProFormSelect
                options={[
                  {
                    value: 1,
                    label: "Kỳ 1",
                  },
                  {
                    value: 2,
                    label: "Kỳ 2",
                  },
                ]}
                width='sm'
                placeholder='Kỳ học'
                initialValue={semester}
                name='semester'
                label='Kỳ học :'
                onChange={setSemester}></ProFormSelect>
              <ProFormSelect
                options={schoolYearOptions}
                width='sm'
                placeholder='Năm học'
                name='schoolYear'
                label='Năm học :'
                onChange={setSchoolYear}
                initialValue={schoolYear}
              />
              <ProFormSelect
                options={student.map((x) => ({
                  value: x.id,
                  label: x.id + " - " + x.name,
                }))}
                width='sm'
                placeholder='Lớp trưởng'
                name='monitor'
                label='Lớp trưởng'
                onChange={setMonitorId}
              />
            </Space>
          </Col>
          {student.length != 0 && (
            <Col>
              <Space size='large'>
                <Button
                  type='primary'
                  onClick={exportFile}
                  icon={<FileExcelOutlined />}>
                  Xuất file
                </Button>
              </Space>
            </Col>
          )}
        </Row>
      </ProForm>

      {student.length === 0 && !!semester && !!schoolYear ? (
        <TranscriptDragger
          classId={classId!}
          semester={semester}
          schoolYear={schoolYear}
          loadData={loadStudent}
        />
      ) : (
        <ProTable
          loading={loading}
          dataSource={student.map((x) => ({ ...x, key: x.id }))}
          columns={cols}
        />
      )}
    </>
  );
}
