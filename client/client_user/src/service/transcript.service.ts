import { post } from "~/lib/api";

const prefix = "Transcript";

export const uploadTranscript = async ({
  classId,
  semester,
  schoolYear,
}: {
  classId: string;
  semester: number;
  schoolYear: string;
}) => {
  try {
    const res = await post(prefix + "/upload", {
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
