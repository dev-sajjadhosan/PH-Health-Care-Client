"use server";

import {
  createPatient,
  deletePatient,
  getPatientById,
  updatePatient,
} from "@/services/patient.services";
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types";
import {
  type ICreatePatientPayload,
  type IPatient,
  type IPatientDetails,
  type IUpdatePatientPayload,
} from "@/types/patient.types";
import {
  createPatientServerZodSchema,
  updatePatientServerZodSchema,
} from "@/zod/patient.validation";

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export const createPatientAction = async (
  payload: ICreatePatientPayload,
): Promise<ApiResponse<IPatient> | ApiErrorResponse> => {
  const parsedPayload = createPatientServerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await createPatient(parsedPayload.data as any);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create patient"),
    };
  }
};

export const updatePatientAction = async (
  id: string,
  payload: IUpdatePatientPayload,
): Promise<ApiResponse<IPatient> | ApiErrorResponse> => {
  const parsedPayload = updatePatientServerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await updatePatient(id, parsedPayload.data as any);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update patient"),
    };
  }
};

export const deletePatientAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid patient id",
    };
  }

  try {
    return await deletePatient(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete patient"),
    };
  }
};

export const getPatientByIdAction = async (
  id: string,
): Promise<ApiResponse<IPatientDetails> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid patient id",
    };
  }

  try {
    return await getPatientById(id) as any;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch patient details"),
    };
  }
};

