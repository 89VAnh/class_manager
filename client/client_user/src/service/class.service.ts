import { AxiosRequestConfig } from "axios";
import { get, post } from "~/lib/api";

const prefix = "Class";

export const getById = async (id: string) => {
  try {
    const res = await get(prefix + "/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchClasses = async (params: AxiosRequestConfig["params"]) => {
  try {
    const res = await post(prefix + "/search-by-formteacher", {
      params,
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
