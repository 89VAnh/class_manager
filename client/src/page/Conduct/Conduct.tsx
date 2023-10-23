import {
  DeliveredProcedureOutlined,
  FileExcelOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { ProForm, ProFormSelect } from "@ant-design/pro-components";
import {
  Button,
  Col,
  Modal,
  Row,
  Space,
  Tabs,
  TabsProps,
  Typography,
  Upload,
  message,
  notification,
  theme,
} from "antd";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StickyBox from "react-sticky-box";
import {
  conduct1Columns,
  conduct2Columns,
  conduct3Columns,
  conduct4Columns,
  conduct5Columns,
  summaryColumns,
} from "~/config/columns";
import { BASE_URL } from "~/constant/config";
import { conduct } from "~/model/conduct";
import EditableTable from "~/page/Conduct/ConductTable/ConductTable";
import { getConductOfClass, updateConducts } from "~/service/conduct.service";
import storage from "~/utils/storage";
import styles from "./conduct.module.scss";
// import { data } from "./fakeData.json";

export const ConductsContext = createContext<conduct[]>([]);

export default function Conducts() {
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
  const [conducts, setConducts] = useState<conduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [conductsContext, setConductsContext] = useState<conduct[]>([]);
  const [isOpenConfirmSaveModal, setIsOpenConfirmSaveModal] =
    useState<boolean>(false);
  const [isOpenConfirmCancelModal, setIsOpenConfirmCancelModal] =
    useState<boolean>(false);
  // const [noti, contextHolder] = notification.useNotification();

  const { Dragger } = Upload;

  const completeConduct = (conduct: conduct): conduct => {
    if (!/\d+\/\d+\/\d+/.test(conduct.studentBirthday))
      conduct.studentBirthday = dayjs(conduct.studentBirthday).format(
        "DD/MM/YYYY"
      );
    // persent of fail credits
    const persentOfFailCredits = Math.round(
      (conduct.totalNumOfFailCredits / conduct.totalNumOfCredits) * 100
    );

    conduct.persentOfFailCredits = persentOfFailCredits + "%";

    // I.4
    if (persentOfFailCredits > 30) conduct.i_4 = 0;
    else if (persentOfFailCredits > 20) conduct.i_4 = 1;
    else if (persentOfFailCredits >= 10) conduct.i_4 = 2;
    else if (persentOfFailCredits > 0) conduct.i_4 = 3;
    else if (persentOfFailCredits == 0) conduct.i_4 = 4;
    else conduct.i_4 = 0;

    // I.5
    const pointAverage = conduct.pointAverage;

    if (pointAverage < 5) conduct.i_5 = 0;
    else if (pointAverage < 6) conduct.i_5 = 2;
    else if (pointAverage < 7) conduct.i_5 = 3;
    else if (pointAverage < 8) conduct.i_5 = 4;
    else if (pointAverage < 9) conduct.i_5 = 5;
    else if (pointAverage <= 10) conduct.i_5 = 6;
    else conduct.i_5 = 0;

    // I
    conduct.i =
      conduct.i_1 + conduct.i_2 + conduct.i_3 + conduct.i_4 + conduct.i_5;

    // II
    conduct.iI =
      conduct.iI_1 +
      conduct.iI_2 +
      conduct.iI_3 +
      conduct.iI_4 +
      conduct.iI_5 +
      conduct.iI_6;

    // III
    conduct.iiI = conduct.iiI_1 + conduct.iiI_2 + conduct.iiI_3;

    // IV
    conduct.iV = conduct.iV_1 + conduct.iV_2 + conduct.iV_3;

    if (conduct.iI_3 == 0) conduct.iV = conduct.iV > 10 ? conduct.iV - 10 : 0;

    if (conduct.pointAverage >= 7 || conduct.v_1 == 10) conduct.iV = 20;

    //V_2
    if (conduct.pointAverage >= 9) conduct.v_2 = 10;

    // V
    if (conduct.v_1 == 10 || conduct.v_2 == 10) conduct.v = 10;
    else conduct.v = 0;
    const total = conduct.i + conduct.iI + conduct.iiI + conduct.iV + conduct.v;
    conduct.total = total;

    if (total <= 35) conduct.classification = "Kém";
    else if (total <= 50) conduct.classification = "Yếu";
    else if (total <= 65) conduct.classification = "TB";
    else if (total <= 80) conduct.classification = "Khá";
    else if (total <= 90) conduct.classification = "Tốt";
    else conduct.classification = "Xuất sắc";

    return conduct;
  };

  const handleSave = (row: conduct) => {
    const newData = [...conducts];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...completeConduct(row),
    });
    setConducts(newData);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "THKQRL",
      children: (
        <EditableTable
          loading={loading}
          columns={summaryColumns}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "2",
      label: "Điểm TC 1",
      children: (
        <EditableTable
          loading={loading}
          columns={conduct1Columns}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "3",
      label: "Điểm TC 2",
      children: (
        <EditableTable
          loading={loading}
          columns={conduct2Columns}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "4",
      label: "Điểm TC 3",
      children: (
        <EditableTable
          loading={loading}
          columns={conduct3Columns}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "5",
      label: "Điểm TC 4",
      children: (
        <EditableTable
          loading={loading}
          columns={conduct4Columns}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "6",
      label: "Điểm TC 5",
      children: (
        <EditableTable
          loading={loading}
          columns={conduct5Columns}
          handleSave={handleSave}
        />
      ),
    },
  ];

  // const getConducts = () => {
  //   setLoading(true);

  //   if (classId && semester && schoolYear) {
  //     const c = data.find(
  //       (x) =>
  //         x.classId === classId &&
  //         x.semester === semester &&
  //         x.schoolYear === schoolYear
  //     );
  //     setConducts(c ? c.conduct.map((x: conduct) => completeConduct(x)) : []);
  //   }
  //   setLoading(false);
  // };
  const loadConducts = async () => {
    setLoading(true);

    if (classId && semester && schoolYear) {
      let data: conduct[] = await getConductOfClass({
        classId,
        semester,
        schoolYear,
      });

      data = data.map((x) => completeConduct(x));

      setConducts(data);
      setConductsContext(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadConducts();
  }, [classId, semester, schoolYear]);

  // render tabs
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer, position: "sticky", top: "0px" }}
      />
    </StickyBox>
  );

  // School year drowdown

  const lenght = 6;

  const schoolYearOptions = [...Array(lenght)].map((_, index) => {
    const y = currentYear - index;
    const schoolYear = `${y}-${y + 1}`;

    return schoolYear;
  });

  const saveConducts = async () => {
    try {
      updateConducts(
        conducts.filter(
          (c, i) => JSON.stringify(c) !== JSON.stringify(conductsContext[i])
        )
      );
      notification.success({ message: "Lưu thông tin thành công!" });
    } catch {
      notification.error({ message: "Lưu thất bại!" });
    }
  };

  const uploadConducts = async () => {
    console.log("Upload!!!");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeFile = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`Tải lên file ${info.file.name} thành công!`);
      loadConducts();
    } else if (status === "error") {
      message.error(`Tải lên file ${info.file.name} thất bại!`);
    }
  };

  return (
    <>
      <Typography.Title level={1}>
        ĐIỂM HẠNH KIỂM LỚP {classId}
      </Typography.Title>
      <ProForm submitter={false} autoFocusFirstInput className={styles.form}>
        <Row justify='space-between'>
          <Col>
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
            </Space>
          </Col>
          {conducts.length != 0 && (
            <Col>
              <Space size='large'>
                <Button
                  type='primary'
                  onClick={uploadConducts}
                  icon={<FileExcelOutlined />}>
                  Xuất file
                </Button>
                <Button
                  type='primary'
                  onClick={() => setIsOpenConfirmSaveModal(true)}
                  icon={<DeliveredProcedureOutlined />}>
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenConfirmCancelModal(true);
                  }}>
                  Huỷ
                </Button>
              </Space>
            </Col>
          )}
        </Row>

        {conducts.length === 0 && !!semester && !!schoolYear ? (
          <Dragger
            action={`${BASE_URL}Files/Transcript?Semester=${semester}&SchoolYear=${schoolYear}&ClassId=${classId}`}
            headers={{
              authorization: "Bearer " + storage.getToken(),
            }}
            name='file'
            onChange={changeFile}
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Nhấn hoặc thả file để upload file</p>
            <p className='ant-upload-hint'>
              {`Vui lòng tải lên file bảng điểm của lớp ${classId} học kỳ ${semester} năm học ${schoolYear}`}
            </p>
          </Dragger>
        ) : (
          <ConductsContext.Provider value={conducts}>
            <Tabs
              defaultActiveKey='1'
              items={items}
              type='card'
              animated
              renderTabBar={renderTabBar}
              tabPosition='left'
            />
          </ConductsContext.Provider>
        )}
      </ProForm>

      <Modal
        title='Xác nhận lưu thông tin'
        open={isOpenConfirmSaveModal}
        onOk={() => {
          saveConducts();
          setIsOpenConfirmSaveModal(false);
        }}
        onCancel={() => setIsOpenConfirmSaveModal(false)}
        okText='Lưu thay đổi'
        cancelText='Thoát'>
        <h4>Bạn có chắc chắn muốn lưu thông tin điểm hạnh kiểm không?</h4>
      </Modal>
      <Modal
        title='Xác nhận huỷ thay đổi'
        open={isOpenConfirmCancelModal}
        onOk={() => {
          loadConducts();
          setIsOpenConfirmCancelModal(false);
        }}
        onCancel={() => setIsOpenConfirmCancelModal(false)}
        okText='Huỷ thay đổi'
        cancelText='Thoát'>
        <h4>
          Bạn có chắc chắn muốn huỷ những thay đổi của bảng điểm hạnh kiểm này
          không?
        </h4>
      </Modal>
    </>
  );
}
