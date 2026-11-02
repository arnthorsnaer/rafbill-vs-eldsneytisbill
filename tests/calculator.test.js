import test from "node:test";
import assert from "node:assert/strict";
import { comparison, distanceForBudget, energyCost, krPer100Km, krPerKm, operatingScenario } from "../src/calculator.js";

test("calculates energy cost per 100 km and per km", () => {
  const cost = krPer100Km({ unitPriceKr: 25.76, consumptionPer100Km: 16 });
  assert.equal(cost, 412.16);
  assert.equal(krPerKm({ krPer100Km: cost }), 4.1216);
});

test("calculates distance for a budget", () => {
  assert.equal(distanceForBudget({ budgetKr: 1000, krPer100Km: 412.16 }), 242.62422360248448);
  assert.equal(distanceForBudget({ budgetKr: 0, krPer100Km: 0 }), 0);
});

test("keeps energy, scheduled maintenance and risk reserve separate", () => {
  assert.deepEqual(
    operatingScenario({ km: 100000, krPer100Km: 412.16, scheduledMaintenanceKr: 150000, failureReserveKr: 0 }),
    { energyKr: 412160, scheduledMaintenanceKr: 150000, failureReserveKr: 0, totalKr: 562160 }
  );
  assert.equal(energyCost({ krPer100Km: 1776, km: 100000 }), 1776000);
});

test("derives all three migrated energy scenarios", () => {
  assert.deepEqual(
    comparison({ homeChargingKrPerKwh: 25.76, fastChargingKrPerKwh: 65, evKwhPer100Km: 16, fuelKrPerLitre: 240, fuelLitresPer100Km: 7.4 }),
    { homeKrPer100Km: 412.16, fastKrPer100Km: 1040, fuelKrPer100Km: 1776 }
  );
});

test("rejects invalid scenario inputs", () => {
  assert.throws(() => krPer100Km({ unitPriceKr: -1, consumptionPer100Km: 16 }));
  assert.throws(() => operatingScenario({ km: 1, krPer100Km: 1, failureReserveKr: -1 }));
});
