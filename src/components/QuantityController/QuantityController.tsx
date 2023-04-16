import React, { useState } from "react";
import InputNumber from "../InputNumber";
import { TInputNumberProps } from "../InputNumber/InputNumber";

type QuantityControllerProps = {
  containerClassName?: string;
  max?: number;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onType?: (value: number) => void;
  onFocusOutside?: (value: number) => void;
} & TInputNumberProps;

const QuantityController = ({
  containerClassName,
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOutside,
  value,
  ...rest
}: QuantityControllerProps) => {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value);
    if (max !== undefined && _value >= max) {
      _value = max;
    } else if (_value <= 1) {
      _value = 1;
    }

    onType && onType(_value);
    setLocalValue(_value);
  };

  const handleIncrease = () => {
    let _value = Number(value || localValue) + 1;
    if (max !== undefined && _value > max) {
      _value = max;
    }

    onIncrease && onIncrease(_value);
    setLocalValue(_value);
  };

  const handleDecrease = () => {
    let _value = Number(value || localValue) - 1;
    if (_value <= 1) {
      _value = 1;
    }

    onDecrease && onDecrease(_value);
    setLocalValue(_value);
  };

  const handleOnFocusOutside = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOutside && onFocusOutside(Number(e.target.value));
  };
  return (
    <div className={`${containerClassName} flex items-center`}>
      <button
        onClick={handleDecrease}
        className="flex h-6 w-6 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 sm:h-8 sm:w-8 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-3 w-3 sm:h-4 sm:w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </button>
      <InputNumber
        className="h-6 w-9 rounded-none border-t border-b border-gray-300 p-1 text-center outline-none sm:h-8 sm:w-14"
        errorClassName="hidden"
        value={value || localValue}
        onChange={handleChange}
        onBlur={handleOnFocusOutside}
        {...rest}
      />
      <button
        onClick={handleIncrease}
        className="flex h-6 w-6 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600 sm:h-8 sm:w-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-3 w-3 sm:h-4 sm:w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantityController;
