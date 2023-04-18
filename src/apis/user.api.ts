import { TUser } from "src/types/user.types";
import { TSuccessApiResponse } from "src/types/utils.types";
import http from "src/utils/http";

type TUpdateProfileBody = {
  password?: string;
  new_password?: string;
} & Omit<TUser, "_id" | "roles" | "createdAt" | "updatedAt" | "email">;

const userApi = {
  getProfile: () => http.get<TSuccessApiResponse<TUser>>("/me"),
  updateProfile: (body: TUpdateProfileBody) => http.put<TSuccessApiResponse<TUser>>("/user", body),
  uploadAvatar: (body: FormData) =>
    http.post<TSuccessApiResponse<string>>("/user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default userApi;
