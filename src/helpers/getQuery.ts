import { IAuth } from "../pages/Login";

export function getQueryString(data:IAuth) {
    return Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
