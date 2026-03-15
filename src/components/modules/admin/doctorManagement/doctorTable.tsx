"use client";

import TanTable from "@/components/shared/dashboard/tanTable";
import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";
import { doctorColumns } from "./doctorColumns";

export default function DoctorTable({
  queryParams,
  queryString,
}: {
  queryParams: { [key: string]: string | string[] | undefined };
  queryString: string;
}) {
  const { data: doctorsDataResponse, isLoading } = useQuery({
    queryKey: ["doctors", queryParams],
    queryFn: () => getDoctors(queryString),
  });
  const { data: doctors } = doctorsDataResponse! || [];

  console.log(doctors);

  return (
    <>
      <TanTable
        queryParams={queryParams}
        queryString={queryString}
        columns={doctorColumns}
        data={doctors || []}
        isLoading={isLoading}
        actions={{
          onView: (data) => console.log(data),
          onEdit: (data) => console.log(data),
          onDelete: (data) => console.log(data),
        }}
      />
    </>
  );
}
