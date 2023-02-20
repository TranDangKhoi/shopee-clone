import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";
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

export const registerSchema = yup.object({
  email: yup.string().email("E-mail không hợp lệ").required("Không được để trống địa chỉ e-mail"),
  password: yup
    .string()
    .required("Không được để trống mật khẩu")
    .min(6, "Độ dài của password phải từ 6 ký tự trở lên")
    .max(160, "Độ dài của password phải từ 160 ký tự trở xuống"),
  confirm_password: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu của bạn")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
});

export const loginSchema = registerSchema.omit(["confirm_password"]);

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;
export type LoginSchemaType = yup.InferType<typeof loginSchema>;
