import classNames from "classnames";
import React from "react";

type TButtonProps = {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({ type = "submit", containerClassName, className, children, isLoading, onClick }: TButtonProps) => {
  return (
    <div className={containerClassName}>
      <button
        type={type}
        className={classNames(
          "w-full bg-primary py-3 px-2 text-center text-sm uppercase text-white hover:bg-red-600",
          { "pointer-events-none cursor-not-allowed select-none bg-opacity-50 hover:bg-opacity-50": isLoading },
          `${className}`,
        )}
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
