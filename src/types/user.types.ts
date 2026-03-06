import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo: string;
  needsChnagePassword: boolean;
  isDeleted: boolean;
}
