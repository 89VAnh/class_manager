import { atom } from "recoil";

export const UserState = atom({
  key: "UserState",
  default: {
    username: "",
    fullname: "",
    email: "",
  },
});
