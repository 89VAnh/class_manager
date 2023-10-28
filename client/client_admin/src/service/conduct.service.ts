import { get, put } from "~/lib/api";
import { conduct } from "~/model/conduct";

const prefix = "Conduct";

export const getConductOfClass = async ({
  classId,
  semester,
  schoolYear,
}: {
  classId: string;
  semester: number;
  schoolYear: string;
}) => {
  try {
    const res = await get(prefix + "/get-conduct-of-class", {
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

export const updateConducts = async (conducts: conduct[]) => {
  try {
    const res = await put(prefix + "/update-multiple-conduct", {
      conducts,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const exportConductFile = async ({
  classId,
  semester,
  schoolYear,
  monitorId,
}: {
  classId: string;
  semester: number;
  schoolYear: string;
  monitorId: string;
}) => {
  try {
    await get(prefix + "/get-excel-file-of-class", {
      params: {
        classId,
        semester,
        schoolYear,
        monitorId,
      },
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Tổng hợp KQRL_HK${semester}_${schoolYear}_${classId}`
      );
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
