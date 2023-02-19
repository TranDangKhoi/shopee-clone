import type { RegisterOptions, UseFormGetValues } from "react-hook-form";

type Schemas = {
  [key in "email" | "password" | "confirm_password"]?: RegisterOptions;
};
export const getSchemas = (getValues?: UseFormGetValues<any>): Schemas => ({
  email: {
    required: {
      value: true,
      message: "Không được để trống địa chỉ e-mail",
    },
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email không hợp lệ",
    },
  },
  password: {
    required: {
      value: true,
      message: "Không được để trống mật khẩu",
    },
    maxLength: {
      value: 160,
      message: "Độ dài của password phải từ 160 ký tự trở xuống",
    },
    minLength: {
      value: 6,
      message: "Độ dài của password phải từ 6 ký tự trở lên",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Vui lòng xác nhận mật khẩu của bạn",
    },
    maxLength: {
      value: 160,
      message: "Độ dài của password phải từ 160 ký tự trở xuống",
    },
    minLength: {
      value: 6,
      message: "Độ dài của password phải từ 6 ký tự trở lên",
    },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "Mật khẩu không trùng khớp"
        : undefined,
  },
});
