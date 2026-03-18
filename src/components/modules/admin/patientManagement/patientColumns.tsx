import UserInfoCell from "@/components/shared/ceil/UserInfoCell";
import DateCeil from "@/components/shared/ceil/DateCeil";
import { IPatient } from "@/types/patient.types";
import { ColumnDef } from "@tanstack/react-table";

export const patientColumns: ColumnDef<IPatient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto}
      />
    ),
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm">{row.original?.contactNumber || "N/A"}</span>
      </div>
    ),
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm">{row.original?.address || "N/A"}</span>
      </div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Registered On",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      if (!createdAt) return <span>N/A</span>;
      return <DateCeil date={createdAt as Date} formatString="MMM dd, yyyy" />;
    },
  },
];
