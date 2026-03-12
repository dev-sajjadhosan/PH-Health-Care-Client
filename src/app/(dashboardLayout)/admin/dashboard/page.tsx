import AdminDashboardContent from "@/components/modules/dashboard/adminDashboardContent";
import { getDashboardData } from "@/services/dashboard.services";
import { IAdminDashboardData } from "@/types/dashboard.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminDashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    
  });

  // const dashboardData = queryClient.getQueryData([
  //   "admin-dashboard-data",
  // ]) as IAdminDashboardData;
  // console.log(dashboardData, "Dashboard data fetched successfully");

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminDashboardContent />
      </HydrationBoundary>
    </>
  );
}
