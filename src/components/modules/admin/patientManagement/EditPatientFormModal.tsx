"use client";

import { IPatient } from "@/types/patient.types";

export default function EditPatientFormModal({
  open,
  onOpenChange,
  patient,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}) {
  return <div>Edit Patient Modal (Coming Soon)</div>;
}
