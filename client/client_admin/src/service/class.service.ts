import { get } from "~/lib/api";

const prefix = "Class";

export const getClasses = async (lecturerId: string) => {
  try {
    const res = await get(prefix, {
      params: {
        lecturerId,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
