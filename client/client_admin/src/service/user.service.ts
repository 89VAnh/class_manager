import { AxiosError } from "axios";
import { get, post, put } from "~/lib/api";
import storage from "~/utils/storage";

const prefix = "Account";

export const Login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await post(
      `${prefix}/login`,
      JSON.stringify({ username, password })
    );

    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    throw err.response?.data;
  }
};

export const ValidateToken = async () => {
  try {
    const token = storage.getToken();

    const res = await get(`${prefix}/login/validate/${token}`);

    return res.data;
  } catch {
    return false;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChangePassword = async (data: Record<string, any>) => {
  try {
    const res = await put(`${prefix}/change-password`, JSON.stringify(data));
    return res.data;
  } catch (e) {
    const err = e as AxiosError;
    throw err.response?.data;
  }
};
