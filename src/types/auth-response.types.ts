import { UserType } from "./user.types";
import { ApiResponseType } from "./utils.types";

export type AuthResponseType = ApiResponseType<{
  access_token: string;
  expires: string;
  user: UserType;
}>;
