import axios, { AxiosError } from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_CLASSMANAGER_API_URL,
});

export const get = async (path: string, options = {}) => {
  try {
    const response = await httpRequest.get(path, options);
    return response;
  } catch (e) {
    throw e as AxiosError;
  }
};

export const post = async (path: string, data = {}, options = {}) => {
  try {
    const response = await httpRequest.post(path, data, options);

    return response;
  } catch (e) {
    throw e as AxiosError;
  }
};

export default httpRequest;
