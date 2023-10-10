import * as request from "~/utils/httpRequest.js";

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
    const res = await request.get("Conduct/get-conduct-of-class", {
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
