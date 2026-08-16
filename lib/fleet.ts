import {
  DEMO_GLASS,
  DEPLOYED_UNITS,
  FLEET_SIZE,
  LANGUAGE_SHARE,
} from "./metrics";

export type GlassStatus = "healthy" | "low-battery" | "syncing" | "docked";
export type TourId = "A" | "B" | "C";

export type GlassUnit = {
  id: string;
  index: number;
  battery: number;
  tempC: number;
  language: string;
  status: GlassStatus;
  tour: TourId | null;
  guestId: number | null;
};

const LANGUAGES = ["German", "Mandarin", "Hindi", "English"] as const;

function languageForDeployedIndex(i: number): (typeof LANGUAGES)[number] {
  const german = Math.round((LANGUAGE_SHARE.german / 100) * DEPLOYED_UNITS);
  const mandarin = Math.round((LANGUAGE_SHARE.mandarin / 100) * DEPLOYED_UNITS);
  const hindi = Math.round((LANGUAGE_SHARE.hindi / 100) * DEPLOYED_UNITS);
  if (i < german) return "German";
  if (i < german + mandarin) return "Mandarin";
  if (i < german + mandarin + hindi) return "Hindi";
  return "English";
}

function tourForDeployedIndex(i: number): TourId {
  if (i < 18) return "A";
  if (i < 32) return "B";
  return "C";
}

/** Deterministic 48-unit rack. IDs AS-ARIA-001…048. */
export function buildFleet(): GlassUnit[] {
  const units: GlassUnit[] = [];
  let deployed = 0;

  for (let n = 1; n <= FLEET_SIZE; n++) {
    const id = `AS-ARIA-${String(n).padStart(3, "0")}`;
    const isDocked = n > DEPLOYED_UNITS;
    const deployedIndex = isDocked ? -1 : deployed;

    let status: GlassStatus = "healthy";
    let battery = 62 + ((n * 13) % 37);
    let tempC = 31 + ((n * 7) % 6);

    if (isDocked) {
      status = "docked";
      battery = 96 + (n % 5);
      tempC = 27 + (n % 3);
    } else if ([7, 19, 33, 41].includes(n)) {
      status = "low-battery";
      battery = 9 + (n % 10);
    } else if ([12, 24, 38].includes(n)) {
      status = "syncing";
      battery = 54 + (n % 20);
    }

    if (id === DEMO_GLASS.id) {
      battery = DEMO_GLASS.battery;
      tempC = DEMO_GLASS.tempC;
    }

    units.push({
      id,
      index: n,
      battery: Math.min(100, battery),
      tempC,
      language: isDocked
        ? "—"
        : id === DEMO_GLASS.id
          ? DEMO_GLASS.language
          : languageForDeployedIndex(deployedIndex),
      status,
      tour: isDocked ? null : tourForDeployedIndex(deployedIndex),
      guestId: isDocked ? null : 100 + deployedIndex + 1,
    });

    if (!isDocked) deployed += 1;
  }

  return units;
}

export const FLEET = buildFleet();

export function statusColor(status: GlassStatus): string {
  switch (status) {
    case "healthy":
      return "#10B981";
    case "low-battery":
      return "#F59E0B";
    case "syncing":
      return "#0EA5E9";
    case "docked":
      return "#64748B";
  }
}

export const FLEET_COUNTS = {
  healthy: FLEET.filter((u) => u.status === "healthy").length,
  lowBattery: FLEET.filter((u) => u.status === "low-battery").length,
  syncing: FLEET.filter((u) => u.status === "syncing").length,
  docked: FLEET.filter((u) => u.status === "docked").length,
  deployed: FLEET.filter((u) => u.status !== "docked").length,
};

export const DOCK_BAY = {
  name: "Charging Bay 1 (Bus #04)",
  ready: FLEET_COUNTS.docked,
  note: "6 units charged and ready",
};
