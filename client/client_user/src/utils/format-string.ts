import dayjs from "dayjs";

export const getKeyFromPath = (path: string) => {
  if (!path) return;

  const texts = path.split("/");
  const len = texts.length;

  return texts[len - 1];
};

export const formatToDate = (strDate: string) => {
  return dayjs(strDate).isValid() ? dayjs(strDate).format(formatDateShow) : "";
};

export const formatDateShow = "DD/MM/YYYY";
export const formatDatePost = "YYYY-MM-DD";
