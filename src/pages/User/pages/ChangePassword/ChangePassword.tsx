import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import omit from "lodash/omit";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import userApi from "src/apis/user.api";
import Button from "src/components/Button";
import InputPassword from "src/components/InputPassword";
import { AuthContext } from "src/contexts/auth.context";
import { TUserSchema, userSchema } from "src/schemas/userSchema";
import { TErrorApiResponse } from "src/types/utils.types";
import { isAxiosError, isAxiosUnprocessableEntity } from "src/utils/isAxiosError";

type TFormData = Pick<TUserSchema, "password" | "new_password" | "confirm_password">;
const changePasswordSchema = userSchema.pick(["password", "new_password", "confirm_password"]);
const ChangePassword = () => {
  const { userProfile } = useContext(AuthContext);
  const {
    handleSubmit,
    reset,
    register,
    setError,
    formState: { errors },
  } = useForm<TFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(changePasswordSchema),
  });
  const updateProfileMutation = useMutation(userApi.updateProfile);

  const handleChangePassword = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, "confirm_password"));
      toast.success(res.data.message);
      reset();
    } catch (error) {
      if (
        isAxiosError<TErrorApiResponse<Omit<TFormData, "confirm_password">>>(error) &&
        isAxiosUnprocessableEntity<TErrorApiResponse<Omit<TFormData, "confirm_password">>>(error)
      ) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<TFormData, "confirm_password">, {
              message: formError[key as keyof Omit<TFormData, "confirm_password">],
              type: "server",
            });
          });
        }
      }
      console.log(error);
      return error;
    }
  });
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <Helmet>
        <title>Shopee At Home | Thay đổi mật khẩu</title>
        <meta
          name="description"
          content={`Đổi mật khẩu tài khoản ${userProfile?.email}`}
        />
      </Helmet>
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Đổi mật khẩu</h1>
        <div className="mt-1 text-sm text-gray-700">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </div>
      <div className="mt-8 mr-auto max-w-[800px]">
        <form
          onSubmit={handleChangePassword}
          className="mt-6 flex-grow md:mt-0 md:pr-12"
        >
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right">Mật khẩu cũ</div>
            <div className="sm:w-[80%] sm:pl-5">
              <InputPassword
                register={register}
                name="password"
                placeholder="Mật khẩu cũ"
                errorMsg={errors.password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right">Mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5">
              <InputPassword
                register={register}
                name="new_password"
                placeholder="Mật khẩu mới"
                errorMsg={errors.new_password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="capitalize sm:w-[20%] sm:pt-3 sm:text-right">Nhập lại mật khẩu mới</div>
            <div className="sm:w-[80%] sm:pl-5">
              <InputPassword
                register={register}
                name="confirm_password"
                placeholder="Xác nhận mật khẩu mới"
                errorMsg={errors.confirm_password?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right"></div>
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
