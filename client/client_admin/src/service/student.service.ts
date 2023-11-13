import { get } from "~/lib/api";

const prefix = "Student";

export const getStudentById = async (id: string) => {
  try {
    const res = await get(prefix + "/get-by-id/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentOfClass = async ({
  classId,
  semester,
  schoolYear,
}: {
  classId: string;
  semester: number;
  schoolYear: string;
}) => {
  try {
    const res = await get(prefix + "/get-student-of-class", {
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
