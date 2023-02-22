import { UserType } from "./user.types";
import { SuccessApiResponseType } from "./utils.types";

export type AuthResponseType = SuccessApiResponseType<{
  access_token: string;
  expires: string;
  user: UserType;
}>;
