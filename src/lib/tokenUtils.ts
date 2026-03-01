"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

const getTokenSecondsRemaining = (token: string) => {
  if (!token) return 0;

  try {
    const tokenPayload: JwtPayload = JWT_ACCESS_SECRET
      ? (jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPayload && !tokenPayload.exp) {
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

export const setTokenInCookies = async (name: string, token: string) => {
  const maxAge = getTokenSecondsRemaining(token);

  await setCookie(name, token, maxAge);
};


