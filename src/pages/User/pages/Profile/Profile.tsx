import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import userApi from "src/apis/user.api";
import Button from "src/components/Button";
import { Input } from "src/components/Input";
import InputNumber from "src/components/InputNumber";
import { AuthContext } from "src/contexts/auth.context";
import { TUserSchema, userSchema } from "src/schemas/userSchema";
import { TErrorApiResponse } from "src/types/utils.types";
import { saveProfileToLS } from "src/utils/auth";
import getAvatarUrl from "src/utils/getAvatarUrl";
import { isAxiosError, isAxiosUnprocessableEntity } from "src/utils/isAxiosError";
import DateSelect from "../../components/DateSelect";

type TFormData = Pick<TUserSchema, "name" | "address" | "phone" | "date_of_birth" | "avatar">;
const profileSchema = userSchema.pick(["name", "address", "phone", "date_of_birth", "avatar"]);

const ONE_MEGABYTE_TO_BYTES = 1048576;

const Profile = () => {
  const [previewImageFile, setPreviewImageFile] = useState<File>();
  const previewImageURL = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : "";
  }, [previewImageFile]);
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    setError,
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
  const avatar = watch("avatar");
  const {
    data: profileData,
    refetch: profileRefetch,
    isLoading: profileIsLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile(),
  });
  const updateProfileMutation = useMutation(userApi.updateProfile);
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar);
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
    try {
      let avatarName = avatar;
      if (previewImageFile) {
        const formData = new FormData();
        formData.append("image", previewImageFile);
        const uploadRes = await uploadAvatarMutation.mutateAsync(formData);
        avatarName = uploadRes.data.data;
        setValue("avatar", avatarName);
      }
      await updateProfileMutation.mutateAsync(
        {
          ...data,
          date_of_birth: data.date_of_birth?.toISOString(),
          avatar: avatarName,
        },
        {
          onSuccess: (data) => {
            profileRefetch();
            toast.success("Đã cập nhật thông tin người dùng");
            setUserProfile(data.data.data);
            saveProfileToLS(data.data.data);
          },
        },
      );
    } catch (error) {
      if (
        isAxiosError<TErrorApiResponse<Omit<TFormData & { date_of_birth: string }, "date_of_birth">>>(error) &&
        isAxiosUnprocessableEntity<TErrorApiResponse<Omit<TFormData & { date_of_birth: string }, "date_of_birth">>>(
          error,
        )
      ) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<TFormData & { date_of_birth: string }, "date_of_birth">, {
              message: formError[key as keyof Omit<TFormData & { date_of_birth: string }, "date_of_birth">],
              type: "server",
            });
          });
        }
      }
      console.log(error);
      return error;
    }
  });
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && fileFromLocal.size >= ONE_MEGABYTE_TO_BYTES) {
      toast.error("Kích cỡ ảnh không được vượt quá 1MB");
      // Set lại value để có thể chọn lại bức ảnh trước một lần nữa đề phòng có chuyện gì xảy ra

      e.target.value = "";
      return;
    }
    if (fileFromLocal && !fileFromLocal.type.includes("image")) {
      toast.error(
        <div className="text-sm">
          File không đúng định dạng quy định
          <br />
          (.JPEG, .PNG, .JPG)
        </div>,
      );
      // Set lại value để có thể hiển thị lại lỗi đề phòng có chuyện gì xảy ra
      e.target.value = "";
      return;
    }
    setPreviewImageFile(fileFromLocal);
  };
  console.log("yahoo");
  const handleSelectAvatar = () => {
    inputFileRef.current?.click();
  };
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
            <div className="my-5 flex h-24 w-24 items-center justify-center overflow-hidden">
              <img
                src={previewImageURL || getAvatarUrl(userProfile?.avatar)}
                alt="Something happened"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png"
              onChange={handleChangeFile}
              ref={inputFileRef}
            />
            <button
              onClick={handleSelectAvatar}
              className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
            >
              Chọn ảnh
            </button>
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng .jpg .jpeg .png</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;