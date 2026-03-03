"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { ILoginResponse } from "@/types/auth.types";
import { registerZodSchema, TRegisterZodSchema } from "@/zod/zod.validation";
import { redirect } from "next/navigation";

export const registerAction = async (
  payload: TRegisterZodSchema,
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid credentials";
    return {
      success: false,
      message: firstError,
    };
  }
  try {
    const res = await httpClient.post<ILoginResponse>(
      "/auth/register",
      parsedPayload.data,
    );

    const { accessToken, refreshToken, token } = res.data;

    console.log({ accessToken, refreshToken, token });

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    redirect("/dashboard");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return {
      success: false,
      message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
