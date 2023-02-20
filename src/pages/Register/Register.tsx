import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { Input } from "src/components/Input";
import { registerSchema, RegisterSchemaType } from "src/utils/schema";

type FormData = RegisterSchemaType;

const Register = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onBlur",
    resolver: yupResolver(registerSchema),
  });
  // const schemas = getSchemas(getValues);
  const handleSignUp = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-24 lg:pr-10">
      <div className="lg:col-span-2 lg:col-start-4">
        <form
          onSubmit={handleSignUp}
          className="rounded bg-white p-10 shadow-sm"
          noValidate
          autoComplete="on"
        >
          <div className="text-2xl">Đăng ký tài khoản</div>
          <Input
            type="email"
            name="email"
            register={register}
            // rules={schemas.email}
            containerClassName="mt-8"
            placeholder="Địa chỉ e-mail"
            errorMsg={errors.email?.message}
          ></Input>
          <Input
            type="password"
            name="password"
            register={register}
            // rules={schemas.password}
            containerClassName="mt-1"
            placeholder="Nhập mật khẩu của bạn"
            errorMsg={errors.password?.message}
          ></Input>
          <Input
            type="password"
            name="confirm_password"
            register={register}
            // rules={schemas.confirm_password}
            containerClassName="mt-1"
            placeholder="Nhập lại mật khẩu của bạn"
            errorMsg={errors.confirm_password?.message}
          ></Input>
          <div className="mt-1">
            <button className="w-full bg-red-500 py-3 px-2 text-center text-sm uppercase text-white hover:bg-red-600">
              Đăng ký
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn đã có tài khoản?</span>
            <Link
              className="ml-1 text-red-400"
              to="/login"
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
