'use server';

import { httpClient } from "@/lib/axios/httpClient";

interface IDoctor {
    id: number;
    name: string;
    image: string;
    speciality: string;
    experience: string;
    rating: number;
    reviews: number;
}

export const getDoctors = async () => {
  const res = await httpClient.get<IDoctor[]>("/doctors");
  return res;
};

