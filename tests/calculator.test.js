import test from "node:test";
import assert from "node:assert/strict";
import { annualCost, comparison, krPer100Km } from "../src/calculator.js";

test("cost per 100 km", () => assert.equal(krPer100Km({ unitPriceKr: 25.76, consumptionPer100Km: 16 }), 412.16));
test("annual cost", () => assert.equal(annualCost({ krPer100Km: 412, annualKm: 20000 }), 82400));
test("migrated defaults preserve the prototype energy comparison", () => {
  const result = comparison({ homeChargingKrPerKwh: 25.76, fastChargingKrPerKwh: 65, evKwhPer100Km: 16, fuelKrPerLitre: 240, fuelLitresPer100Km: 7.4, annualKm: 20000 });
  assert.equal(result.homeKrPer100Km, 412.16);
  assert.equal(result.fastKrPer100Km, 1040);
  assert.equal(result.fuelKrPer100Km, 1776);
  assert.equal(result.homeAnnualKr, 82432);
});
test("rejects invalid inputs", () => assert.throws(() => krPer100Km({ unitPriceKr: -1, consumptionPer100Km: 16 })));
