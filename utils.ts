import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: any) => {
  return jwtDecode(token);
};

export const setToLocalStorage = (key: string, token: string): string => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, token);
  return token;
};

export const getFromLocalStorage = (key: string): string | null => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const removeUserInfo = (key: string): void | string => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
    return;
  }
  return "";
};
