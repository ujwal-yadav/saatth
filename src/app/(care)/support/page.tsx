import type { Metadata } from "next";
import { SupportPage } from "@/components/care-dashboard";

export const metadata: Metadata = { title: "Support" };

export default function Support() {
  return <SupportPage />;
}
