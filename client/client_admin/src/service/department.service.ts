import { AxiosRequestConfig } from "axios";
import { post } from "~/lib/api";

const prefix = "Department";

export const searchDepartment = async (
  params: AxiosRequestConfig["params"]
) => {
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
