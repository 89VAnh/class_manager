import * as request from "~/utils/httpRequest.js";

type Props = {
  username: string;
  password: string;
};

function isErrorWithResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is { response: { data: { message: string } } } {
  return (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  );
}

export const Login = async ({ username, password }: Props) => {
  try {
    const res = await request.post(
      "Account/login",
      JSON.stringify({ username, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data;
  } catch (error) {
    if (isErrorWithResponse(error)) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const ValidateToken = async (token: string | null) => {
  try {
    const res = await request.post(
      "Account/login/validate",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (isErrorWithResponse(error)) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
