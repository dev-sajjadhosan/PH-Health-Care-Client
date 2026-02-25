/* eslint-disable @typescript-eslint/no-explicit-any */
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

const httpGet = async (endPoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().get(endPoint, options);
    return response.data;
  } catch (error) {
    console.error(`Get request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPost = async (endPoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().post(endPoint, options);
    return response.data;
  } catch (error) {
    console.error(`Post request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPut = async (endPoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().put(endPoint, options);
    return response.data;
  } catch (error) {
    console.error(`Put request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpPatch = async (endPoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().patch(endPoint, options);
    return response.data;
  } catch (error) {
    console.error(`Patch request to ${endPoint} failed:`, error);
    throw error;
  }
};

const httpDelete = async (endPoint: string, options?: ApiRequestOptions) => {
  try {
    const response = await axiosInstance().delete(endPoint, options);
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
