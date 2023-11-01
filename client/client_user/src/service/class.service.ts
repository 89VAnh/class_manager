import { get } from "~/lib/api";

const prefix = "Class";

export const getClasses = async (lecturerId: string) => {
  try {
    const res = await get(prefix, {
      params: {
        lecturerId,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getClassInfo = async (
  classId: string,
  semester: number,
  schoolYear: string
) => {
  try {
    const res = await get(`${prefix}/${classId}`, {
      params: {
        semester,
        schoolYear,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonitorOfClass = async (
  classId: string,
  semester: number,
  schoolYear: string
) => {
  try {
    const res = await get(`${prefix}/get-monitor`, {
      params: {
        classId,
        semester,
        schoolYear,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
