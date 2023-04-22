import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "src/components/Button";
import DateSelect from "../../components/DateSelect";
import { TUserSchema, userSchema } from "src/schemas/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { pick } from "lodash";
import { Input } from "src/components/Input";
import { AuthContext } from "src/contexts/auth.context";

type TFormData = Pick<TUserSchema, "password" | "new_password" | "confirm_password">;
const changePasswordSchema = userSchema.pick(["password", "new_password", "confirm_password"]);
const ChangePassword = () => {
  const { userProfile } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    register,
    setError,
    formState: { errors },
  } = useForm<TFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(changePasswordSchema),
  });
  const handleChangePassword = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Đổi mật khẩu</h1>
        <div className="mt-1 text-sm text-gray-700">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </div>
      <div className="mt-8 mr-auto max-w-2xl">
        <form
          onSubmit={handleChangePassword}
          className="mt-6 flex-grow md:mt-0 md:pr-12"
        >
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                register={register}
                name="password"
                placeholder="Mật khẩu mới"
                errorMsg={errors.password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                register={register}
                name="new_password"
                placeholder="Xác nhận mật khẩu mới"
                errorMsg={errors.new_password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Xác nhận mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                register={register}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu mới"
                errorMsg={errors.confirm_password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right"></div>
            <div className="sm:w-[80%] sm:pl-5">
              <Button className="rounded-sm">Cập nhật mật khẩu</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
