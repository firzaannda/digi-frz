import { DashboardTemplate } from "@/components/dashboard/components/DashboardTemplate";
import React from "react";

export default function Layout({ children }) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
