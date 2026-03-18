"use client";

import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { IPatient } from "@/types/patient.types";

export default function ViewPatientProfileDialog({
  open,
  onOpenChange,
  patient,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}) {
  return <div>View Patient Modal (Coming Soon)</div>;
}
