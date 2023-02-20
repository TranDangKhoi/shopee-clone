import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "src/components/Input";
import { getSchemas, loginSchema, LoginSchemaType } from "src/utils/schema";

type FormData = LoginSchemaType;

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const schemas = getSchemas();
  const handleLogin = handleSubmit((data) => {
    console.log(data);
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
