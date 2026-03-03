/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api.types";
import axios from "axios";
import { isTokenExpiringSoon } from "../tokenUtils";
import { cookies, headers } from "next/headers";
import { getNewTokenWithRefreshToken } from "@/services/auth.services";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("Please provide API_BASE_URL in the environment variables");
}

async function tryRefreshToken(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  if (!isTokenExpiringSoon(accessToken)) {
    return;
  }

  const requestHeaders = await headers();
  if (requestHeaders.get("x-token-refreshed") === "1") {
    return; // avoid multiple refresh attempts in the same request lifecycle.
  }

  try {
    await getNewTokenWithRefreshToken(refreshToken);
  } catch (error: any) {
    console.error("Error refreshing token:", error);
  }
}

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeaders = (await cookieStore)
    .getAll()
    .map((cookie: any) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeaders,
    },
  });
  return instance;
};

export interface ApiRequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  data?: any;
}

const httpGet = async <TData>(
  endPoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<ApiResponse<TData>>(endPoint, options);
    return response.data;
  } catch (error) {
    console.error(`Get request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPost = async <TData>(
  endPoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<ApiResponse<TData>>(
      endPoint,
      data,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(`Post request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPut = async <TData>(
  endPoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<ApiResponse<TData>>(
      endPoint,
      data,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(`Put request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPatch = async <TData>(
  endPoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<ApiResponse<TData>>(
      endPoint,
      data,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(`Patch request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpDelete = async <TData>(
  endPoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<ApiResponse<TData>>(
      endPoint,
      options,
    );
    return response.data;
  } catch (error) {
    console.error(`Delete request to ${endPoint} failed:`, error);
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
