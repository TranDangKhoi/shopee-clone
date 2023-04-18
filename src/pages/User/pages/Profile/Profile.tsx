import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import userApi from "src/apis/user.api";
import Button from "src/components/Button";
import { Input } from "src/components/Input";
import InputNumber from "src/components/InputNumber";
import { TUserSchema, userSchema } from "src/schemas/userSchema";
import DateSelect from "../../components/DateSelect";

type TFormData = Pick<TUserSchema, "name" | "address" | "phone" | "date_of_birth" | "avatar">;
const profileSchema = userSchema.pick(["name", "address", "phone", "date_of_birth", "avatar"]);
const Profile = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<TFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
  });
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile(),
  });
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
  });
  const profile = profileData?.data.data;
  useEffect(() => {
    (async function setProfileValue() {
      if (profile) {
        setValue("name", profile.name);
        setValue("address", profile.address);
        setValue("phone", profile.phone);
        setValue("date_of_birth", profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
      }
    })();
  }, [profile, setValue]);

  const handleUpdateProfile = handleSubmit(async (data) => {
    console.log(data);
    // await updateProfileMutation.mutateAsync({});
  });
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">Hồ Sơ Của Tôi</h1>
        <div className="mt-1 text-sm text-gray-700">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <form
          onSubmit={handleUpdateProfile}
          className="mt-6 flex-grow md:mt-0 md:pr-12"
        >
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Email</div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Tên</div>
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
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Số điện thoại</div>
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
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Địa chỉ</div>
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
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelect
                errorMsg={errors.date_of_birth?.message}
                value={field.value}
                onChange={field.onChange}
              ></DateSelect>
            )}
          ></Controller>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right"></div>
            <div className="sm:w-[80%] sm:pl-5">
              <Button className="rounded-sm">Cập nhật</Button>
            </div>
          </div>
        </form>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn"
                alt=""
                className="w-full rounded-full object-cover"
              />
            </div>
            <input
              className="hidden"
              type="file"
              accept=".jpg,.jpeg,.png"
            />
            <button className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm">
              Chọn ảnh
            </button>
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
