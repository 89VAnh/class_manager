import { AxiosRequestConfig } from "axios";
import { del, get, post, put } from "~/lib/api";
import { classInfo } from "~/model/classInfo";

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
    const res = await post(prefix + "/search", {
      params,
    });

    const data = res.data;
    return data;
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

export const createClass = async (classInfo: classInfo) => {
  try {
    const res = await post(`${prefix}/create`, classInfo);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateClass = async (classInfo: classInfo) => {
  try {
    const res = await put(`${prefix}/update`, classInfo);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteClass = async (classId: string) => {
  try {
    const res = await del(prefix + "/delete/" + classId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
