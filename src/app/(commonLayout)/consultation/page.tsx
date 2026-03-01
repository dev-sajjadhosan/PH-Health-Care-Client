import { getDoctors } from "@/app/(commonLayout)/consultation/_action";
import DoctorsList from "@/components/modules/consultation/doctorsList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ConsultationPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsList />
    </HydrationBoundary>
  );
}
