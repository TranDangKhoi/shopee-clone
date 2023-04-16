import { TUser } from "./user.types";
import { TSuccessApiResponse } from "./utils.types";

export type TAuthResponse = TSuccessApiResponse<{
  access_token: string;
  expires: string;
  user: TUser;
}>;
