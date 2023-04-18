import { TQueryConfig } from "src/types/query.type";
import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as Pick<TQueryConfig, "price_max" | "price_min">;
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

export const schema = yup.object({
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
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Khoảng giá không hợp lệ",
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Khoảng giá không hợp lệ",
    test: testPriceMinMax,
  }),
  search: yup.string().trim().required(),
});

export const registerSchema = schema.pick(["email", "password", "confirm_password"]);
export const loginSchema = registerSchema.pick(["email", "password"]);
export const priceRangeSchema = schema.pick(["price_min", "price_max"]);
export const searchQuerySchema = schema.pick(["search"]);

export type TRegisterSchema = yup.InferType<typeof registerSchema>;
export type TLoginSchemaType = yup.InferType<typeof loginSchema>;
export type TPriceRangeType = Required<yup.InferType<typeof priceRangeSchema>>;
export type TSearchQueryType = yup.InferType<typeof searchQuerySchema>;
