import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "src/apis/auth.api";
import { Input } from "src/components/Input";
import { AuthContext } from "src/contexts/auth.context";
import { ErrorApiResponseType } from "src/types/utils.types";
import { isAxiosUnprocessableEntity } from "src/utils/isAxiosError";
import { loginSchema, LoginSchemaType } from "src/utils/schema";

type FormData = LoginSchemaType;
const Login = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body),
  });

  const handleLogin = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
        navigate("/");
      },
      onError: (error) => {
        if (
          isAxiosError<ErrorApiResponseType<FormData>>(error) &&
          isAxiosUnprocessableEntity<ErrorApiResponseType<FormData>>(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, { message: formError[key as keyof FormData], type: "server" });
            });
          }
        }
      },
    });
  });

  return (
    <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
      <div className="lg:col-span-2 lg:col-start-4">
        <form
          onSubmit={handleLogin}
          className="rounded bg-white p-10 shadow-sm"
          noValidate
          autoComplete="on"
        >
          <div className="text-2xl">Đăng nhập tài khoản</div>
          <Input
            type="email"
            errorMsg={errors.email?.message}
            name="email"
            register={register}
            placeholder="Địa chỉ e-mail"
            containerClassName="mt-8"
          ></Input>
          <Input
            type="password"
            errorMsg={errors.password?.message}
            name="password"
            register={register}
            placeholder="Mật khẩu của bạn"
            containerClassName="mt-1"
          ></Input>
          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600"
            >
              Đăng nhập
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn chưa có tài khoản?</span>
            <Link
              className="ml-1 text-red-400"
              to="/register"
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
