"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { CareDialog } from "@/components/care-dialog";
import { neighbourhoods, services, type Booking, type CareDialogState, type CarePlan } from "@/lib/saatth";

type SavedCare = { bookings: Booking[]; plans: CarePlan[]; neighbourhood: string };
type SaatthContextValue = SavedCare & {
  dialog: CareDialogState | null;
  openDialog: (dialog: CareDialogState) => void;
  closeDialog: () => void;
  addBooking: (booking: Omit<Booking, "id">) => void;
  addPlan: (plan: Omit<CarePlan, "id">) => void;
  setNeighbourhood: (neighbourhood: string) => void;
};

const storageKey = "saatth-care-v1";
const storageEvent = "saatth-care-change";
const initialCare: SavedCare = { bookings: [], plans: [], neighbourhood: neighbourhoods[0] };
const SaatthContext = createContext<SaatthContextValue | null>(null);
let memorySnapshot: string | null = null;
let useMemory = false;

function readSnapshot() {
  if (useMemory) return memorySnapshot;
  try {
    // Keep plans saved before the brand rename available on this device.
    return window.localStorage.getItem(storageKey)
      ?? window.localStorage.getItem("Saatth-care-v1")
      ?? window.localStorage.getItem("saath-care-v1");
  } catch {
    return memorySnapshot;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(storageEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(storageEvent, callback);
  };
}

function isBooking(value: unknown): value is Booking {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" &&
    services.some((service) => service.id === item.serviceId) &&
    typeof item.person === "string" && typeof item.address === "string" &&
    typeof item.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
    !Number.isNaN(Date.parse(item.date)) &&
    typeof item.hours === "number" && [2, 3, 6].includes(item.hours);
}

function isPlan(value: unknown): value is CarePlan {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && typeof item.frequency === "string" && typeof item.time === "string";
}

function decodeSnapshot(snapshot: string | null): SavedCare {
  if (!snapshot) return initialCare;
  try {
    const saved = JSON.parse(snapshot);
    if (!saved || typeof saved !== "object") return initialCare;
    return {
      bookings: Array.isArray(saved.bookings) ? saved.bookings.filter(isBooking) : [],
      plans: Array.isArray(saved.plans) ? saved.plans.filter(isPlan) : [],
      neighbourhood: neighbourhoods.includes(saved.neighbourhood) ? saved.neighbourhood : neighbourhoods[0],
    };
  } catch {
    return initialCare;
  }
}

function updateCare(update: (current: SavedCare) => SavedCare) {
  memorySnapshot = JSON.stringify(update(decodeSnapshot(readSnapshot())));
  try {
    window.localStorage.setItem(storageKey, memorySnapshot);
    useMemory = false;
  } catch {
    // Keep the current session usable when browser storage is unavailable.
    useMemory = true;
  }
  window.dispatchEvent(new Event(storageEvent));
}

function createLocalId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (value) => value.toString(16).padStart(8, "0")).join("");
}

export function SaatthProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<CareDialogState | null>(null);
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => null);
  const care = useMemo(() => decodeSnapshot(snapshot), [snapshot]);
  const closeDialog = useCallback(() => setDialog(null), []);
  const addBooking = useCallback((booking: Omit<Booking, "id">) => {
    updateCare((current) => ({ ...current, bookings: [...current.bookings, { ...booking, id: createLocalId() }] }));
  }, []);
  const addPlan = useCallback((plan: Omit<CarePlan, "id">) => {
    updateCare((current) => ({ ...current, plans: [...current.plans, { ...plan, id: createLocalId() }] }));
  }, []);
  const setNeighbourhood = useCallback((neighbourhood: string) => {
    if (neighbourhoods.includes(neighbourhood)) updateCare((current) => ({ ...current, neighbourhood }));
  }, []);

  return (
    <SaatthContext.Provider value={{ ...care, dialog, openDialog: setDialog, closeDialog, addBooking, addPlan, setNeighbourhood }}>
      {children}
      <CareDialog />
    </SaatthContext.Provider>
  );
}

export function useSaatth() {
  const context = useContext(SaatthContext);
  if (!context) throw new Error("useSaatth must be used inside SaatthProvider");
  return context;
}
