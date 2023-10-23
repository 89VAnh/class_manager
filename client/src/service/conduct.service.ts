import { get, put } from "~/lib/api";
import { conduct } from "~/model/conduct";

type Props = {
  classId: string;
  semester: number;
  schoolYear: string;
};

const prefix = "Conduct/";

export const getConductOfClass = async ({
  classId,
  semester,
  schoolYear,
}: Props) => {
  try {
    const res = await get(prefix + "get-conduct-of-class", {
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
    const res = await put(prefix + "update-multiple-conduct", {
      conducts,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
