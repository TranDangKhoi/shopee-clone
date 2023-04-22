import { Controller, useFormContext } from "react-hook-form";
import { Input } from "src/components/Input";
import InputNumber from "src/components/InputNumber";
import { TUserSchema } from "src/schemas/userSchema";

type TFormData = Pick<TUserSchema, "name" | "address" | "phone" | "date_of_birth" | "avatar">;
type TInformationGroupProps = {
  className?: string;
};
const InformationGroup = ({ className }: TInformationGroupProps) => {
  const methods = useFormContext<TFormData>();
  const {
    register,
    formState: { errors },
    control,
  } = methods;
  return (
    <>
      <div className={className}>
        <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right">Tên</div>
        <div className="sm:w-[80%] sm:pl-5">
          <Input
            register={register}
            name="name"
            placeholder="Tên người dùng"
            errorMsg={errors.name?.message}
            className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
        <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right">Số điện thoại</div>
        <div className="sm:w-[80%] sm:pl-5">
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <InputNumber
                placeholder="Số điện thoại"
                errorMsg={errors.phone?.message}
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...field}
                onChange={field.onChange}
              />
            )}
          ></Controller>
        </div>
      </div>
      <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
        <div className="truncate capitalize sm:w-[20%] sm:pt-3 sm:text-right">Địa chỉ</div>
        <div className="sm:w-[80%] sm:pl-5">
          <Input
            register={register}
            name="address"
            placeholder="Địa chỉ"
            errorMsg={errors.address?.message}
            className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
          />
        </div>
      </div>
    </>
  );
};

export default InformationGroup;
