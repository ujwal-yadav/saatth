import type { Metadata } from "next";
import { VisitsPage } from "@/components/care-dashboard";

export const metadata: Metadata = { title: "My visits" };

export default function Visits() {
  return <VisitsPage />;
}
