type Role = "User" | "Admin";
export type TUser = {
  _id: string;
  roles: Role[];
  email: string;
  name?: string;
  date_of_birth?: string; // ISO 8601
  address?: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};
