"use client";

import type { CSSProperties } from "react";
import { useSaatth } from "@/components/saatth-provider";
import { Icon } from "@/components/ui";
import { formatMoney, services } from "@/lib/saatth";

export function ServiceCards({ compact = false }: { compact?: boolean }) {
  const { openDialog } = useSaatth();
  return (
    <div className={`grid services-grid${compact ? " is-compact" : ""}`}>
      {services.map((service) => (
        <button key={service.id} className="service" onClick={() => openDialog({ kind: "booking", serviceId: service.id })}>
          <span className="service-top"><span className="iconbox" style={{ "--tone": service.tone } as CSSProperties}><Icon name={service.icon} /></span><span className="service-arrow"><Icon name="arrow" /></span></span>
          <span className="service-name">{service.title}</span>
          <span className="service-description">{service.description}</span>
          <span className="service-rate">From <b>{formatMoney(service.rate)}</b><span> / hour · estimate</span></span>
        </button>
      ))}
    </div>
  );
}
