import { config } from "src/constants/config.enum";

const getAvatarUrl = (avatarName?: string, username?: string) => {
  return avatarName ? `${config.baseURL}/images/${avatarName}` : `${config.randomAvatar}${username}`;
};

export default getAvatarUrl;
