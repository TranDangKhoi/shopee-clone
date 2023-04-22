import classNames from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import { FieldPath, FieldValues, useController, UseControllerProps } from "react-hook-form";

export type TInputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  className?: string;
  containerClassName?: string;
  errorClassName?: string;
  name: "price_min" | "price_max";
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>;

function InputControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: TInputControlProps<TFieldValues, TName>) {
  const {
    type,
    placeholder,
    value = "",
    onChange,
    className = "p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm",
    containerClassName = "",
    errorClassName = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
    ...rest
  } = props;
  const { field, fieldState } = useController(props);
  const [localValue, setLocalValue] = useState<string>(field.value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isNumberType = type === "number" && (/^\d+$/.test(inputValue) || inputValue === "");
    if (isNumberType || type !== "number") {
      // Cập nhật localValue state
      setLocalValue(inputValue);
      // Gọi field.onChange để cập nhật vào state của React Hook Form
      field.onChange(e);
      // Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e);
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
            "border-red-600 bg-red-50 focus:border-red-600": fieldState.error?.message,
          },
        )}
        {...rest}
        {...field}
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={errorClassName}>{fieldState.error?.message}</div>
    </div>
  );
}

export default InputControl;
