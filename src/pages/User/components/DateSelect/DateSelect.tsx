import { range } from "lodash";
import React, { useState } from "react";

type TDateSelectProps = {
  onChange?: (value: Date) => void;
  value?: Date;
  errorMsg?: string;
};

const DateSelect = ({ errorMsg, onChange, value }: TDateSelectProps) => {
  const [dateOfBirth, setDateOfBirth] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    const newDateOfBirth = {
      ...dateOfBirth,
      [name]: value,
    };
    setDateOfBirth(newDateOfBirth);
    onChange && onChange(new Date(newDateOfBirth.year, newDateOfBirth.month, newDateOfBirth.date));
  };

  return (
    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Ngày sinh</div>
      <div className="sm:w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select
            onChange={handleChange}
            name="date"
            value={value?.getDate() || dateOfBirth.date}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none focus:border-primary"
          >
            {range(1, 32).map((date) => (
              <option
                key={date}
                value={date}
              >
                {date}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name="month"
            value={value?.getMonth() || dateOfBirth.month}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none focus:border-primary"
          >
            {range(0, 12).map((month) => (
              <option
                key={month}
                value={month}
              >
                Tháng {month + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name="year"
            value={value?.getFullYear() || dateOfBirth.year}
            className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none focus:border-primary"
          >
            {range(1990, new Date().getFullYear() + 1).map((year) => (
              <option
                className="hover:bg-primary hover:text-white"
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errorMsg}</div>
      </div>
    </div>
  );
};

export default DateSelect;
