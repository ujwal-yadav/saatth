import type { IconName } from "@/components/ui";

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: IconName;
  tone: string;
  rate: number;
};

export const services: Service[] = [
  { id: 0, title: "Hospital companion", description: "Someone to go with, wait with and take care.", icon: "hospital", tone: "#e8eddc", rate: 249 },
  { id: 1, title: "Care for parents", description: "Companionship, routines and daily support.", icon: "users", tone: "#fdebdc", rate: 229 },
  { id: 2, title: "Everyday errands", description: "Groceries, bills, appointments and more.", icon: "cart", tone: "#f1e9fb", rate: 199 },
  { id: 3, title: "Your own driver", description: "Safe, reliable rides for you and your family.", icon: "car", tone: "#eee8fb", rate: 249 },
  { id: 4, title: "Event assistance", description: "Help with family functions and special occasions.", icon: "gift", tone: "#e9efdd", rate: 249 },
  { id: 5, title: "Compassion support", description: "A listening ear and a reassuring presence.", icon: "heart", tone: "#ffebdd", rate: 229 },
];

export type Booking = {
  id: string;
  serviceId: number;
  person: string;
  date: string;
  hours: number;
  address: string;
};

export type CarePlan = { id: string; frequency: string; time: string };

export type CareDialogState =
  | { kind: "booking"; serviceId: number; person?: string }
  | { kind: "support"; topic?: string }
  | { kind: "tracking" | "recurring" | "how" | "location" };

export const neighbourhoods = ["Vaishali Nagar", "Malviya Nagar", "C-Scheme"];

export function dateString(offset = 0) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  const date = new Date(`${today}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(amount);
}
