"use client";

import AppointmentBarChart from "@/components/shared/dashboard/appointmentBarChart";
import AppointmentPieChart from "@/components/shared/dashboard/appointmentPieChart";
import { StatsCard } from "@/components/shared/dashboard/statsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always", // Refetch the data when the window regains focus
  });

  const { data } = adminDashboardData as ApiResponse<IAdminDashboardData>;

  console.log(data);
  return (
    <div className="space-y-7">
      <div className="flex items-center gap-5">
        <StatsCard
          title="Total Users"
          value={data?.userCount || 0}
          iconName="Users"
          description="Number of users registered"
        />
        <StatsCard
          title="Total Appointments"
          value={data?.appointmentCount || 0}
          iconName="CalendarDays"
          description="Number of appointments scheduled"
        />
        <StatsCard
          title="Total Patients"
          value={data?.patientCount || 0}
          iconName="User"
          description="Number of patients registered"
        />
        <StatsCard
          title="Total Doctors"
          value={data?.doctorCount || 0}
          iconName="Stethoscope"
          description="Number of doctors registered"
        />
      </div>

      <div className="flex items-center gap-5 ">
        <AppointmentBarChart data={data?.barChartData || []} />
        <AppointmentPieChart
          data={data?.pieChartData || []}
          title="Appointment Pie Chart"
          description="Appointment Statistics"
        />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
