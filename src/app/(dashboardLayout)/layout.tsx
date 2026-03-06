import DashboardNavbar from "@/components/modules/dashboard/dashboardNavbar";
import { DashboardSidebar } from "@/components/modules/dashboard/dashboardSidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar />
        <main className="flex-1 overflow-y-scroll bg-muted/20 p-5 md:p-6">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
