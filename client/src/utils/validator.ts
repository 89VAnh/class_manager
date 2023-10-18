import { FormRule } from "antd";

// Validator
interface keyValidator {
  required?: boolean;
  email?: string;
  phone?: string;
  number?: number;
  // username?: string;
  // password?: string;
}

export const RULES_FORM: Record<keyof keyValidator, FormRule[]> = {
  required: [
    {
      required: true,
      message: "Không thể để trống",
    },
  ],
  email: [
    {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "Email không đúng định dạng",
    },
  ],
  phone: [
    {
      pattern: /^[0-9]*$/gm,
      message: "Số điện thoại không đúng định dạng",
    },
  ],
  number: [
    {
      pattern: /^[0-9]*$/gm,
      message: "Chỉ được là số",
    },
  ],
  // username: [
  //   {
  //     pattern: /^[a-zA-Z0-9]{4,10}$/g,
  //     message: "Mã người dùng phải là chữ hoặc số, độ dài 4 đến 10 ký tự",
  //   },
  // ],
  // password: [
  //   {
  //     pattern: /^[a-zA-Z0-9]{4,10}$/g,
  //     message: "Mã người dùng phải là chữ hoặc số, độ dài 4 đến 10 ký tự",
  //   },
  // ],
};
