import { getCurrentUser, setCurrentAccessToken } from "../../storage";
import { refreshToken } from "../auth.api";

const tokenHasExpired = expirationTimestamp => {
  const currentTimestamp = Math.floor(Date.now());
  return expirationTimestamp <= currentTimestamp;
};

const refreshTokenAction = async () => {
  let currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const accessTokenExpired = tokenHasExpired(
    currentUser.accessToken.expirationTimestamp
  );

  if (accessTokenExpired) {
    currentUser = await refreshToken({ token: currentUser.accessToken.token });
    if (currentUser) {
      await setCurrentAccessToken(currentUser.accessToken);
      return currentUser;
    }
  }

  return null;
};

export default refreshTokenAction;
