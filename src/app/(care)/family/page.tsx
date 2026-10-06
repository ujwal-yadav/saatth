import type { Metadata } from "next";
import { FamilyPage } from "@/components/care-dashboard";

export const metadata: Metadata = { title: "My circle" };

export default function Family() {
  return <FamilyPage />;
}
