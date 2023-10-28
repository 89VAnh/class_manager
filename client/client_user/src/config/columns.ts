import { column } from "../model/conduct";

const ordinalNumberWidth = "5rem";
const studentNameWitdh = "16%";
const studentIdWitdh = "10rem";
const birthdayWith = "10rem";

export const summaryColumns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "studentBirthday",
    title: "Ngày sinh",
    width: birthdayWith,
  },
  {
    dataIndex: "i",
    title: "Tiêu chuẩn 1",
    align: "center",
  },
  {
    dataIndex: "iI",
    title: "Tiêu chuẩn 2",
    align: "center",
  },
  {
    dataIndex: "iiI",
    title: "Tiêu chuẩn 3",
    align: "center",
  },
  {
    dataIndex: "iV",
    title: "Tiêu chuẩn 4",
    align: "center",
  },
  {
    dataIndex: "v",
    title: "Tiêu chuẩn 5",
    align: "center",
  },
  {
    dataIndex: "total",
    title: "Tổng",
    align: "center",
  },
  {
    dataIndex: "classification",
    title: "Xếp loại",
    align: "center",
  },
];

export const conduct1Columns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "pointAverage",
    title: "Điểm TB",
    align: "center",
  },
  {
    dataIndex: "totalNumOfFailCredits",
    title: "Số TC học lại",
    align: "center",
  },

  {
    dataIndex: "persentOfFailCredits",
    title: "% học lại",
    align: "center",
  },
  {
    dataIndex: "i_1",
    title: "Ý thức học tập",
    align: "center",
    min: 0,
    max: 6,
    editable: true,
  },
  {
    dataIndex: "i_2",
    title: "Câu lạc bộ",
    editable: true,
    min: 0,
    max: 2,
    align: "center",
  },
  {
    dataIndex: "i_3",
    title: "Tham gia thi",
    editable: true,
    min: 0,
    max: 2,
    align: "center",
  },
  {
    dataIndex: "i_4",
    title: "Tinh thần vượt khó",
    min: 0,
    max: 4,
    align: "center",
  },
  {
    dataIndex: "i_5",

    min: 0,
    max: 6,
    title: "KQHT",
    align: "center",
  },
  {
    dataIndex: "i",
    title: "Tiêu chuẩn 1",
    min: 0,
    max: 20,
    align: "center",
  },
];

export const conduct2Columns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "iI_1",
    title: "Ý thức chấp hành văn bản, chỉ đạo của nhà trường",
    editable: true,
    min: 0,
    max: 3,
    align: "center",
  },
  {
    dataIndex: "iI_2",
    title: "Ý thức thực hiện quy chế thi, kiểm tra",
    editable: true,
    min: 0,
    max: 4,
    align: "center",
  },
  {
    dataIndex: "iI_3",
    title: "Thực hiện tốt nghĩa vụ của SV trong nhà trường (học phí, BH)",
    editable: true,
    min: 0,
    max: 6,
    align: "center",
  },
  {
    dataIndex: "iI_4",
    title: "Thực hiện tốt quy chế nội trú, ngoại trú",
    align: "center",
    editable: true,
    min: 0,
    max: 4,
  },
  {
    dataIndex: "iI_5",
    title: "Thực hiện tốt vệ sinh môi trường, nơi ở",
    align: "center",
    editable: true,
    min: 0,
    max: 4,
  },
  {
    dataIndex: "iI_6",
    title: "Ý thức học tập, trau dồi kỹ năng sống",
    align: "center",
    editable: true,
    min: 0,
    max: 4,
  },
  {
    dataIndex: "iI",
    title: "Tiêu chuẩn 2",
    align: "center",
    min: 0,
    max: 25,
  },
];

export const conduct3Columns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "iiI_1",
    title: "Tham gia sinh hoạt tuần công dân, các hoạt động nhà trường tổ chức",
    editable: true,
    min: 0,
    max: 10,
    align: "center",
  },
  {
    dataIndex: "iiI_2",
    title: "Ý thức tham gia các hoạt động công ích, tình nguyện",
    editable: true,
    min: 0,
    max: 5,
    align: "center",
  },
  {
    dataIndex: "iiI_3",
    title: "Tham gia tuyên truyền, phòng chống tội phạm",
    editable: true,
    min: 0,
    max: 5,
    align: "center",
  },
  {
    dataIndex: "iiI",
    title: "Tiêu chuẩn 3",
    align: "center",
    min: 0,
    max: 20,
  },
];
export const conduct4Columns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "pointAverage",
    title: "Điểm TB",
    align: "center",
  },
  {
    dataIndex: "iV_1",
    title: "Ý thức chấp hành, tuyên truyền chủ trương của Đảng",
    editable: true,
    min: 0,
    max: 10,
    align: "center",
  },
  {
    dataIndex: "iV_2",
    title: "Ý thức tham gia các hoạt động xã hội có thành tích đc ghi nhận",
    editable: true,
    min: 0,
    max: 2,
    align: "center",
  },
  {
    dataIndex: "iV_3",
    title: "Công tác từ thiện",
    editable: true,
    min: 0,
    max: 8,
    align: "center",
  },
  {
    dataIndex: "iV",
    title: "Tiêu chuẩn 4",
    align: "center",
  },
];
export const conduct5Columns: column[] = [
  {
    dataIndex: "ordinalNumber",
    title: "STT",
    align: "center",
    width: ordinalNumberWidth,
  },
  {
    dataIndex: "studentId",
    title: "Mã HSSV",
    width: studentIdWitdh,
  },
  {
    dataIndex: "studentName",
    title: "Họ Tên",
    width: studentNameWitdh,
  },
  {
    dataIndex: "pointAverage",
    title: "Điểm TB",
    align: "center",
  },
  {
    dataIndex: "v_1",
    title: "Cán bộ lớp, cán bộ đoàn",
    editable: true,
    min: 0,
    max: 10,
    align: "center",
  },
  {
    dataIndex: "v_2",
    title: "SV đạt thành tích đặc biệt",
    min: 0,
    max: 10,
    align: "center",
  },
  {
    dataIndex: "v",
    title: "Tiêu chuẩn 1",
    align: "center",
  },
];
