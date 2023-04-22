import React from "react";

type TInputFileProps = {
  className?: string;
  children?: React.ReactNode;
  handleChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickOnInput?: () => void;
  inputFileRef?: React.RefObject<HTMLInputElement>;
};

const InputFile = ({ children, className, handleChangeFile, handleClickOnInput, inputFileRef }: TInputFileProps) => {
  return (
    <div className={className}>
      <input
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleChangeFile}
        ref={inputFileRef}
      />
      <button
        onClick={handleClickOnInput}
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
      >
        {children}
      </button>
    </div>
  );
};

export default InputFile;
