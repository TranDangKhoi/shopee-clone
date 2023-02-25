import type { RegisterOptions } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
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
  price_min: yup.string(),
  price_max: yup.string(),
});

export const registerSchema = schema.omit(["price_min", "price_max"]);
export const loginSchema = registerSchema.omit(["confirm_password"]);
export const priceRangeSchema = schema.pick(["price_min", "price_max"]);

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;
export type LoginSchemaType = yup.InferType<typeof loginSchema>;
