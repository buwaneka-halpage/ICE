"use client";

import { useState } from "react";
import { DOCK_BAY, FLEET, FLEET_COUNTS, statusColor, type GlassUnit } from "@/lib/fleet";

export function FleetRack() {
  const [hover, setHover] = useState<GlassUnit | null>(
    FLEET.find((u) => u.id === "AS-ARIA-024") ?? FLEET[0],
  );

  return (
    <section className="panel flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="label">Fleet telemetry</p>
          <h2 className="mt-1 text-[15px] tracking-tight">Battery rack · 48 units</h2>
        </div>
        <div className="flex gap-2 font-mono text-[10px] text-telemetry">
          <Legend color="#10B981" label="On tour" n={FLEET_COUNTS.healthy} />
          <Legend color="#F59E0B" label="<20%" n={FLEET_COUNTS.lowBattery} />
          <Legend color="#0EA5E9" label="Sync" n={FLEET_COUNTS.syncing} />
        </div>
      </div>

      <div className="grid grid-cols-8 gap-1.5 p-3">
        {FLEET.map((unit) => {
          const color = statusColor(unit.status);
          const active = hover?.id === unit.id;
          return (
            <button
              key={unit.id}
              type="button"
              onMouseEnter={() => setHover(unit)}
              onFocus={() => setHover(unit)}
              title={unit.id}
              className={`aspect-square rounded-md border bg-surface/80 p-0.5 transition-transform ${
                active ? "scale-[1.06] border-white/25" : "border-white/8 hover:border-white/20"
              }`}
            >
              <span
                className="flex h-full w-full items-center justify-center rounded-[4px] font-mono text-[8px] text-ink-dim"
                style={{
                  boxShadow: `inset 0 0 0 1.5px ${color}`,
                  background:
                    unit.status === "docked"
                      ? "transparent"
                      : `linear-gradient(to top, ${color}22, transparent 70%)`,
                }}
              >
                {String(unit.index).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {hover && (
        <div className="mx-3 mb-3 rounded-lg border border-white/10 bg-surface p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[11px] text-sun">{hover.id}</p>
              <p className="mt-0.5 text-[12px] text-ink-dim">
                {hover.status === "docked"
                  ? "Docked · charging"
                  : `Tour ${hover.tour} · Guest #${hover.guestId}`}
              </p>
            </div>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
              style={{
                color: statusColor(hover.status),
                background: `${statusColor(hover.status)}22`,
              }}
            >
              {hover.status}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
            <div>
              <dt className="text-telemetry">Battery</dt>
              <dd>{hover.battery}%</dd>
            </div>
            <div>
              <dt className="text-telemetry">Temp</dt>
              <dd>{hover.tempC}°C</dd>
            </div>
            <div>
              <dt className="text-telemetry">Language</dt>
              <dd>{hover.language}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-auto border-t border-white/10 px-4 py-3">
        <p className="label">Dock station</p>
        <p className="mt-1 text-[13px]">{DOCK_BAY.name}</p>
        <p className="text-[12px] text-ink-dim">{DOCK_BAY.note}</p>
      </div>
    </section>
  );
}

function Legend({ color, label, n }: { color: string; label: string; n: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label} {n}
    </span>
  );
}
