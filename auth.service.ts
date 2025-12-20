import { authKey } from "./constants";
import { decodedToken, getFromLocalStorage, setToLocalStorage } from "./utils";

// Interface for decoded token data
interface DecodedUser {
  [key: string]: unknown;
}

export const storeUserInfo = (accessToken: string): string => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = (): DecodedUser | string => {
  if (typeof window === "undefined") {
    return ""; // Ensure not to run on the server
  }
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken) as DecodedUser;
    return decodedData;
  }
  return "";
};

export const isLoggedIn = (): boolean => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};
