import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  LogOut,
  HelpCircle,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getNavItemsByRole } from "@/lib/navItems";
import { NavItem, NavSection } from "@/types/dashboard.types";
import { getUserInfo } from "@/services/auth.services";
import { getDefaultDashboardRoute, UserRole } from "@/lib/authUtils";
import DashboardSidebarContent from "./dashboardSidebarContent";

export async function DashboardSidebar() {
  const userInfo = await getUserInfo();
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role as UserRole);

  const dashboardHome = getDefaultDashboardRoute(userInfo?.role as UserRole);

  return (
    <div className=" hidden md:flex h-full min-h-screen w-64 flex-col">
      {/* <div className="mb-8 flex items-center px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Package className="h-5 w-5" />
        </div>
        <span className="ml-3 text-lg font-bold tracking-tight">
          PH HealthCare
        </span>
      </div> */}

      <DashboardSidebarContent
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
}
