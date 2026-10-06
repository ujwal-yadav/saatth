import type { Metadata } from "next";
import { DashboardHome } from "@/components/care-dashboard";

export const metadata: Metadata = { title: "Your care dashboard" };

export default function Dashboard() {
  return <DashboardHome />;
}
