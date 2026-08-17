import { FLEET_SIZE, DEPLOYED_UNITS, MONTHLY_NET_PROFIT_PER_GLASS_USD, utilizationPct } from "./metrics";
import type { Capture } from "./captures";

export const SCENARIO_LABEL = "Scenario · Sigiriya high season · 48 glasses";

export function fleetAfterSurge(approved: boolean) {
  const docked = approved ? 0 : FLEET_SIZE - DEPLOYED_UNITS;
  const deployed = approved ? FLEET_SIZE : DEPLOYED_UNITS;
  return {
    docked,
    deployed,
    util: utilizationPct(deployed, FLEET_SIZE),
    idleUsd: Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * docked),
  };
}

/** Seeded walk photos so the operator strip is never empty in a demo. */
export const SCENARIO_CAPTURES: Capture[] = [
  {
    url: "/demo/fountain-today.jpg",
    pathname: "demo/fountain-today.jpg",
    uploadedAt: "2026-08-17T03:48:00.000Z",
    size: 0,
    contentType: "image/jpeg",
    device_id: "AS-ARIA-024",
    capture_id: "cap_vg01",
    title: "Fountain #3 · water gardens",
    node_id: "water-gardens",
  },
  {
    url: "/demo/captures/lion-paw.jpg",
    pathname: "demo/lion-paw.jpg",
    uploadedAt: "2026-08-17T04:12:00.000Z",
    size: 0,
    contentType: "image/jpeg",
    device_id: "AS-ARIA-018",
    capture_id: "cap_lp01",
    title: "Lion’s Paw terrace",
    node_id: "lion-paw",
  },
  {
    url: "/demo/captures/frescoes.jpg",
    pathname: "demo/frescoes.jpg",
    uploadedAt: "2026-08-17T04:31:00.000Z",
    size: 0,
    contentType: "image/jpeg",
    device_id: "AS-ARIA-031",
    capture_id: "cap_fr01",
    title: "Fresco pocket · maidens",
    node_id: "frescoes",
  },
];

export function mergeCaptures(live: Capture[]): Capture[] {
  const seen = new Set(live.map((c) => c.pathname));
  return [...live, ...SCENARIO_CAPTURES.filter((c) => !seen.has(c.pathname))];
}
