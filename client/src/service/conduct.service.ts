import { get } from "~/lib/api";

type Props = {
  classId: string;
  semester: string;
  schoolYear: string;
};

export const getConductOfClass = async ({
  classId,
  semester,
  schoolYear,
}: Props) => {
  try {
    const res = await get("Conduct/get-conduct-of-class", {
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
