import classNames from "classnames";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = {
  type: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  // errors?: ;
};

const Input = ({
  type = "text",
  errorMsg,
  name,
  register,
  className = "",
  containerClassName = "",
  placeholder = "",
  rules,
}: InputProps) => {
  return (
    <div className={containerClassName}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(
          "w-full rounded-sm border border-gray-300 p-3 outline-none",
          // Interactive
          "focus:border-gray-500 focus:shadow-sm",
          // Error!
          {
            "border-red-600 bg-red-50 focus:border-red-600": errorMsg,
          },
          // Custom classNames
          `${className}`,
        )}
        {...register(name, rules)}
      />
      <div className="mt-1 min-h-[20px] text-sm text-red-600">{errorMsg}</div>
    </div>
  );
};

export default Input;
