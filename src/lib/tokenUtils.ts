"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const getTokenSecondsRemaining = (token: string) => {
  if (!token) return 0;

  try {
    const tokenPayload: JwtPayload = jwt.decode(token) as JwtPayload;

    if (!tokenPayload || !tokenPayload.exp) {
      return 0;
    }

    const remainingSeconds =
      (tokenPayload.exp as number) - Math.floor(Date.now() / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const setTokenInCookies = async (
  name: string,
  token: string,
  fallbackMaxAge: number = 60 * 60 * 24,
) => {
  let maxAge;

  if (name !== "better-auth.session_token") {
    maxAge = getTokenSecondsRemaining(token);
  }

  await setCookie(name, token, maxAge || fallbackMaxAge);
};

export const isTokenExpiringSoon = async (
  token: string,
  thresholdSeconds: number = 300,
): Promise<boolean> => {
  const remainingSeconds = getTokenSecondsRemaining(token);
  return remainingSeconds > 0 && remainingSeconds <= thresholdSeconds;
};


export const isTokenExpired = async (token: string): Promise<boolean> => {
  const remainingSeconds = getTokenSecondsRemaining(token);
  return remainingSeconds === 0;
};