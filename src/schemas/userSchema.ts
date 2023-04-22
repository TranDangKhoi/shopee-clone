import * as yup from "yup";
import { schema } from "./schema";
export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ"),
  password: schema.fields["password"] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, "">,
  new_password: yup
    .string()
    .required("Vui lòng nhập vào mật khẩu mới")
    .min(6, "Độ dài của password phải từ 6 ký tự trở lên")
    .max(160, "Độ dài của password phải từ 160 ký tự trở xuống"),
  confirm_password: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu của bạn")
    .oneOf([yup.ref("new_password")], "Mật khẩu xác nhận không trùng khớp"),
});

export type TUserSchema = yup.InferType<typeof userSchema>;
