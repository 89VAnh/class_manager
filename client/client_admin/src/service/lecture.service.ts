import { AxiosRequestConfig } from "axios";
import { get, post } from "~/lib/api";

const prefix = "Lecturer";

export const getLecturer = async (id: string) => {
  try {
    const res = await get(prefix + "/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchLecturer = async (params: AxiosRequestConfig["params"]) => {
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
