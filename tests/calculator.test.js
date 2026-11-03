import test from "node:test";
import assert from "node:assert/strict";
import { distanceForBudget, energyCost, krPer100Km, krPerKm, operatingScenario } from "../src/calculator.js";

test("calculates Enyaq energy cost from an explicit home tariff", () => {
  const cost = krPer100Km({ unitPriceKr: 21.87, consumptionPer100Km: 17.4 });
  assert.equal(cost, 380.538);
  assert.equal(krPerKm({ krPer100Km: cost }), 3.80538);
});
test("calculates Kodiaq distance for a cash budget", () => {
  const cost = krPer100Km({ unitPriceKr: 284.2, consumptionPer100Km: 7.5 });
  assert.equal(cost, 2131.5);
  assert.equal(distanceForBudget({ budgetKr: 1000, krPer100Km: cost }), 46.915317851278445);
});
test("keeps illustrative maintenance and reserve separate from energy", () => {
  assert.deepEqual(operatingScenario({ km: 100000, krPer100Km: 380.538, scheduledMaintenanceKr: 250000, failureReserveKr: 0 }), { energyKr: 380538, scheduledMaintenanceKr: 250000, failureReserveKr: 0, totalKr: 630538 });
});
test("rejects invalid inputs", () => {
  assert.throws(() => krPer100Km({ unitPriceKr: -1, consumptionPer100Km: 1 }));
  assert.throws(() => operatingScenario({ km: 1, krPer100Km: 1, scheduledMaintenanceKr: -1 }));
});
