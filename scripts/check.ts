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

console.log("metrics self-check passed");
