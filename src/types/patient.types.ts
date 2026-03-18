export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface IPatient {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isDeleted?: boolean;
}

export interface ICreatePatientPayload {
  password?: string;
  patient: {
    name: string;
    email: string;
    contactNumber?: string;
    address?: string;
  };
}

export interface IUpdatePatientPayload {
  name?: string;
  contactNumber?: string;
  address?: string;
}

export interface IPatientDetails {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}