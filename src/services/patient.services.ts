"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPatient, IUpdatePatientPayload, ICreatePatientPayload } from "@/types/patient.types";
import { ISpecialty } from "@/types/specialty.types";



export const getPatients = async (queryString : string) => {
    try {
        const patients = await httpClient.get<IPatient[]>(queryString ? `/patients?${queryString}` : "/patients");
        return patients;
    } catch (error) {
        console.log("Error fetching patients:", error);
        throw error;
    }
}

export const getAllSpecialties = async () => {
    try {
        const specialties = await httpClient.get<ISpecialty[]>("/specialties");
        return specialties;
    } catch (error) {
        console.log("Error fetching specialties:", error);
        throw error;
    }
}

export const createPatient = async (payload: ICreatePatientPayload) => {
    try {
        const response = await httpClient.post<IPatient>("/user/create-patient", payload);
        return response;
    } catch (error) {
        console.log("Error creating patient:", error);
        throw error;
    }
}


export const updatePatient = async (id: string, payload: IUpdatePatientPayload) => {
    try {
        const response = await httpClient.patch<IPatient>(`/patients/${id}`, payload);
        return response;
    } catch (error) {
        console.log("Error updating patient:", error);
        throw error;
    }
}

export const deletePatient = async (id: string) => {
    try {
        const response = await httpClient.delete<{ message: string }>(`/patients/${id}`);
        return response;
    } catch (error) {
        console.log("Error deleting patient:", error);
        throw error;
    }
}

export const getPatientById = async (id: string) => {
    try {
        const patient = await httpClient.get<IPatient>(`/patients/${id}`);
        return patient;
    } catch (error) {
        console.log("Error fetching patient by id:", error);
        throw error;
    }
}