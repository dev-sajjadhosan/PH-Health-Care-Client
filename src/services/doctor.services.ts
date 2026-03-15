"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";

export const getDoctors = async (queryString?: string) => {
  try {
    const res = await httpClient.get<IDoctor[]>(
      queryString ? `/doctors?${queryString}` : "/doctors",
    );
    return res;
  } catch (error: any) {
    console.error("Backend Error Response Data:", error.response?.data);
    throw error;
  }
};
