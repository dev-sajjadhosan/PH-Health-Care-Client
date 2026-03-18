import { z } from "zod";

export const createPatientServerZodSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  patient: z.object({
    name: z.string("Name is required"),
    email: z.email("Invalid email address"),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const updatePatientServerZodSchema = z.object({
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});
