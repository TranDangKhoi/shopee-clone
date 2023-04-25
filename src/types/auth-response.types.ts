import { TUser } from "./user.types";
import { TSuccessApiResponse } from "./utils.types";

export type TAuthResponse = TSuccessApiResponse<{
  access_token: string;
  refresh_token: string;
  expires_refresh_token: number;
  expires: number;
  user: TUser;
}>;

export type TRefreshTokenResponse = TSuccessApiResponse<{
  access_token: string;
}>;
