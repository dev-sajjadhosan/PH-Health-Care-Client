/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/api.types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("Please provide API_BASE_URL in the environment variables");
}

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
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
    const instance = axiosInstance();
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
    const instance = axiosInstance();
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
    const response = await axiosInstance().put<ApiResponse<TData>>(
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
    const response = await axiosInstance().patch<ApiResponse<TData>>(
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
    const response = await axiosInstance().delete<ApiResponse<TData>>(
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
