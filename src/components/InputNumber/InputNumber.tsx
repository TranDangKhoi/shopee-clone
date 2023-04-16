import classNames from "classnames";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";

export type TInputNumberProps = {
  type?: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputNumber = forwardRef<HTMLInputElement, TInputNumberProps>(function InputNumberInner(
  {
    type = "text",
    errorMsg,
    className = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
    containerClassName = "",
    errorClassName = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
    placeholder = "",
    onChange,
    value = "",
    ...rest
  },
  ref,
) {
  const [localValue, setLocalValue] = useState<string>(value as string);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d+$/.test(value) || value === "") {
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e);
      // Cập nhật localValue state
      setLocalValue(value);
    }
  };
  return (
    <div className={containerClassName}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(
          // Custom classNames
          `${className}`,
          // Error!
          {
            "border-red-600 bg-red-50 focus:border-red-600": errorMsg,
          },
        )}
        onChange={handleChange}
        value={value || localValue}
        ref={ref}
        {...rest}
      />
      <div className={errorClassName}>{errorMsg}</div>
    </div>
  );
});

export default InputNumber;
