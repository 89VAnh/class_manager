import { Tabs, TabsProps, theme } from "antd";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";
import StickyBox from "react-sticky-box";
import EditableTable from "~/components/ConductTable/ConductTable";
import {
  conduct1Columns,
  conduct2Columns,
  conduct3Columns,
  conduct4Columns,
  conduct5Columns,
  summaryColumns,
} from "~/config/columns";
import { conduct } from "~/model/conduct";
// import { getConductOfClass } from "~/service/conductService";
import { fakeData } from "./fakeData";

export const ConductsContext = createContext<conduct[]>([]);

export default function Conducts() {
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

    if (conduct.iI_3 == 0) conduct.iV -= 10;

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
        <EditableTable columns={summaryColumns} handleSave={handleSave} />
      ),
    },
    {
      key: "2",
      label: "Điểm TC 1",
      children: (
        <EditableTable columns={conduct1Columns} handleSave={handleSave} />
      ),
    },
    {
      key: "3",
      label: "Điểm TC 2",
      children: (
        <EditableTable columns={conduct2Columns} handleSave={handleSave} />
      ),
    },
    {
      key: "4",
      label: "Điểm TC 3",
      children: (
        <EditableTable columns={conduct3Columns} handleSave={handleSave} />
      ),
    },
    {
      key: "5",
      label: "Điểm TC 4",
      children: (
        <EditableTable columns={conduct4Columns} handleSave={handleSave} />
      ),
    },
    {
      key: "6",
      label: "Điểm TC 5",
      children: (
        <EditableTable columns={conduct5Columns} handleSave={handleSave} />
      ),
    },
  ];

  const [conducts, setConducts] = useState<conduct[]>([]);

  useEffect(() => {
    //   const fetchApi = async () => {
    //     let data: conduct[] = await getConductOfClass({
    //       classId: "125211",
    //       semester: "2",
    //       schoolYear: "2022-2023",
    //     });

    //     data = data.map((x) => completeConduct(x));

    //     setConducts(data);
    //   };

    //   fetchApi();
    setConducts(fakeData.map((x) => completeConduct(x)));
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderTabBar: TabsProps["renderTabBar"] = (props, DefaultTabBar) => (
    <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar
        {...props}
        style={{ background: colorBgContainer, position: "sticky", top: "0px" }}
      />
    </StickyBox>
  );

  return (
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
  );
}
