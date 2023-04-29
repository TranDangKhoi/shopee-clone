import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/auth.api";
import Button from "src/components/Button";
import { Input } from "src/components/Input";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { TErrorApiResponse } from "src/types/utils.types";
import { isAxiosUnprocessableEntity } from "src/utils/isAxiosError";
import { loginSchema, TLoginSchemaType } from "src/schemas/schema";
import { Helmet } from "react-helmet-async";

type FormData = TLoginSchemaType;
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
  const { setIsAuthenticated, setUserProfile } = useContext(AuthContext);
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body),
  });

  const handleLogin = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setUserProfile(data.data.data.user);
        navigate(path.home);
      },
      onError: (error) => {
        if (
          isAxiosError<TErrorApiResponse<FormData>>(error) &&
          isAxiosUnprocessableEntity<TErrorApiResponse<FormData>>(error)
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
      <Helmet>
        <title>Shopee At Home | Đăng nhập</title>
        <meta
          name="description"
          content="Trang đăng nhập của Shopee At Home"
        />
      </Helmet>
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
            <Button
              type="submit"
              isLoading={loginAccountMutation.isLoading}
              containerClassName="mt-1"
            >
              Đăng nhập
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn chưa có tài khoản?</span>
            <Link
              className="ml-1 text-red-400"
              to={path.register}
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
