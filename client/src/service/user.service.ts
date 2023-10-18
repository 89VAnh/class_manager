import { AxiosError } from "axios";
import { get, post } from "~/lib/api";
import storage from "~/utils/storage";

type Props = {
  username: string;
  password: string;
};

const prefix = "Account/";

export const Login = async ({ username, password }: Props) => {
  try {
    const res = await post(
      `${prefix}login`,
      JSON.stringify({ username, password })
    );

    return res.data;
  } catch (e) {
    throw e as AxiosError;
  }
};

export const ValidateToken = async () => {
  try {
    const token = storage.getToken();

    const res = await get(`Account/login/validate/${token}`);

    return res.data;
  } catch {
    return false;
  }
};
