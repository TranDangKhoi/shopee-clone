import classNames from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import EyeCloseIcon from "../Icon/EyeCloseIcon";
import EyeOpenIcon from "../Icon/EyeOpenIcon";

type TInputPasswordProps = {
  errorMsg?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

const InputPassword = ({
  errorMsg,
  name,
  register,
  className = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
  containerClassName,
  errorClassName = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  placeholder,
  rules,
  ...rest
}: TInputPasswordProps) => {
  const registerResult = register && name ? register(name, rules) : {};
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <div className={`${containerClassName} relative`}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={classNames(
            `${className}`,
            // Error!
            {
              "border-red-600 bg-red-50 focus:border-red-600": errorMsg,
            },
            // Custom classNames
          )}
          {...rest}
          {...registerResult}
        />
        {showPassword ? (
          <span
            onClick={() => setShowPassword(false)}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            aria-hidden={true}
          >
            <EyeOpenIcon
              className="h-4 w-4"
              fill="gray"
            ></EyeOpenIcon>
          </span>
        ) : (
          <span
            onClick={() => setShowPassword(true)}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            aria-hidden={true}
          >
            <EyeCloseIcon
              className="h-4 w-4"
              fill="gray"
            ></EyeCloseIcon>
          </span>
        )}
      </div>
      <div className={errorClassName}>{errorMsg}</div>
    </>
  );
};

export default InputPassword;
