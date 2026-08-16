/** Shared unit economics + fleet KPIs. Keep operator UI and the self-check in lockstep. */

export const FLEET_SIZE = 48;
export const DEPLOYED_UNITS = 42;
export const CAPEX_PER_GLASS_USD = 300;
export const SURCHARGE_PER_TOURIST_USD = 5;
export const MONTHLY_NET_PROFIT_PER_GLASS_USD = 54.8;
export const BREAK_EVEN_MONTH = 4.2;
export const ANCILLARY_MTD_USD = 4280;
export const ANCILLARY_TARGET_USD = 5035; // 4280 / 0.85
export const QA_RATING_PCT = 98.4;
export const TRANSLATION_NON_ENGLISH_PCT = 78;
export const AR_TRACKING_ACCURACY_PCT = 98.2;
export const DEMO_GLASS = {
  id: "AS-ARIA-024",
  battery: 82,
  tempC: 34,
  language: "German",
} as const;

export const LANGUAGE_SHARE = {
  german: 34,
  mandarin: 26,
  hindi: 18,
  english: 22,
} as const;

export function utilizationPct(deployed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((deployed / total) * 1000) / 10;
}

export function ancillaryProgressPct(mtd: number, target: number): number {
  if (target <= 0) return 0;
  return Math.round((mtd / target) * 100);
}

export function languageShareTotal(
  share: Record<string, number> = LANGUAGE_SHARE,
): number {
  return Object.values(share).reduce((sum, n) => sum + n, 0);
}

/** Cumulative surcharge revenue vs $300 capex. Crosses capex at month 4.2. */
export function cumulativeRevenueAt(month: number): number {
  const points: [number, number][] = [
    [0, 0],
    [1, 48],
    [2, 118],
    [3, 205],
    [4, 289],
    [4.2, CAPEX_PER_GLASS_USD],
    [5, 289 + MONTHLY_NET_PROFIT_PER_GLASS_USD],
    [6, 289 + MONTHLY_NET_PROFIT_PER_GLASS_USD * 2],
  ];
  if (month <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [m1, r1] = points[i - 1];
    const [m0, r0] = points[i];
    if (month <= m0) {
      const t = (month - m1) / (m0 - m1);
      return r1 + t * (r0 - r1);
    }
  }
  return points[points.length - 1][1];
}

export function breakEvenMonthFromCurve(
  capex = CAPEX_PER_GLASS_USD,
  lo = 3,
  hi = 5,
): number {
  let a = lo;
  let b = hi;
  for (let i = 0; i < 40; i++) {
    const mid = (a + b) / 2;
    if (cumulativeRevenueAt(mid) < capex) a = mid;
    else b = mid;
  }
  return Math.round(((a + b) / 2) * 10) / 10;
}

export function monthlyNetAtEnd(): number {
  return (
    Math.round(
      (cumulativeRevenueAt(6) - cumulativeRevenueAt(5)) * 10,
    ) / 10
  );
}
