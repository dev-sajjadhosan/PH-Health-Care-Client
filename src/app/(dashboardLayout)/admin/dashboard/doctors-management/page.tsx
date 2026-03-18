import DoctorTable from "@/components/modules/admin/doctorManagement/doctorTable";
import { getDoctors } from "@/services/doctor.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DoctorsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const queryParams = await searchParams;
  const queryString = Object.keys(queryParams)
    .map((key) => {
      const value = queryParams[key];
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");
    
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(queryString),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorTable initialQueryString={queryString} />
    </HydrationBoundary>
  );
}

