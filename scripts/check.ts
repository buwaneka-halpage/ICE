import assert from "node:assert/strict";
import {
  ANCILLARY_MTD_USD,
  ANCILLARY_TARGET_USD,
  BREAK_EVEN_MONTH,
  CAPEX_PER_GLASS_USD,
  DEMO_GLASS,
  DEPLOYED_UNITS,
  FLEET_SIZE,
  LANGUAGE_SHARE,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
  ancillaryProgressPct,
  breakEvenMonthFromCurve,
  cumulativeRevenueAt,
  languageShareTotal,
  monthlyNetAtEnd,
  utilizationPct,
} from "../lib/metrics.ts";
import {
  capturePathname,
  parseCapturePath,
  sanitizeDeviceId,
} from "../lib/captures.ts";

assert.equal(utilizationPct(DEPLOYED_UNITS, FLEET_SIZE), 87.5);
assert.equal(languageShareTotal(LANGUAGE_SHARE), 100);
assert.equal(ancillaryProgressPct(ANCILLARY_MTD_USD, ANCILLARY_TARGET_USD), 85);
assert.equal(cumulativeRevenueAt(BREAK_EVEN_MONTH), CAPEX_PER_GLASS_USD);
assert.equal(breakEvenMonthFromCurve(), BREAK_EVEN_MONTH);
assert.equal(monthlyNetAtEnd(), MONTHLY_NET_PROFIT_PER_GLASS_USD);
assert.equal(DEMO_GLASS.id, "AS-ARIA-024");
assert.equal(DEMO_GLASS.battery, 82);
assert.equal(DEMO_GLASS.tempC, 34);
assert.equal(DEMO_GLASS.language, "German");
assert.equal(FLEET_SIZE - DEPLOYED_UNITS, 6);

assert.equal(sanitizeDeviceId("as-aria-024"), "AS-ARIA-024");
assert.equal(sanitizeDeviceId("nope"), "UNKNOWN");
const path = capturePathname(
  { device_id: "AS-ARIA-024", capture_id: "cap_vg01" },
  "Fountain #3.jpg",
);
assert.equal(path.startsWith("captures/AS-ARIA-024/cap_vg01-"), true);
assert.equal(parseCapturePath(path).device_id, "AS-ARIA-024");
assert.equal(parseCapturePath(path).capture_id, "cap_vg01");
assert.equal(utilizationPct(FLEET_SIZE, FLEET_SIZE), 100);

console.log("metrics self-check passed");
