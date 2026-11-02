/** Deterministic scenario maths. Inputs are assumptions, not live prices or forecasts. */
function nonNegative(value, name) {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${name} must be a non-negative finite number.`);
}

export function krPer100Km({ unitPriceKr, consumptionPer100Km }) {
  nonNegative(unitPriceKr, "unitPriceKr");
  nonNegative(consumptionPer100Km, "consumptionPer100Km");
  return unitPriceKr * consumptionPer100Km;
}

export function krPerKm({ krPer100Km: cost }) {
  nonNegative(cost, "krPer100Km");
  return cost / 100;
}

export function distanceForBudget({ budgetKr, krPer100Km: cost }) {
  nonNegative(budgetKr, "budgetKr");
  nonNegative(cost, "krPer100Km");
  if (cost === 0) return budgetKr === 0 ? 0 : Infinity;
  return (budgetKr / cost) * 100;
}

export function energyCost({ krPer100Km: cost, km }) {
  nonNegative(cost, "krPer100Km");
  nonNegative(km, "km");
  return Number((cost * km / 100).toFixed(2));
}

export function operatingScenario({ km, krPer100Km: cost, scheduledMaintenanceKr = 0, failureReserveKr = 0 }) {
  nonNegative(km, "km");
  nonNegative(cost, "krPer100Km");
  nonNegative(scheduledMaintenanceKr, "scheduledMaintenanceKr");
  nonNegative(failureReserveKr, "failureReserveKr");
  const energyKr = energyCost({ krPer100Km: cost, km });
  return { energyKr, scheduledMaintenanceKr, failureReserveKr, totalKr: energyKr + scheduledMaintenanceKr + failureReserveKr };
}

export function comparison(defaults) {
  const home = krPer100Km({ unitPriceKr: defaults.homeChargingKrPerKwh, consumptionPer100Km: defaults.evKwhPer100Km });
  const fast = krPer100Km({ unitPriceKr: defaults.fastChargingKrPerKwh, consumptionPer100Km: defaults.evKwhPer100Km });
  const fuel = krPer100Km({ unitPriceKr: defaults.fuelKrPerLitre, consumptionPer100Km: defaults.fuelLitresPer100Km });
  return { homeKrPer100Km: home, fastKrPer100Km: fast, fuelKrPer100Km: fuel };
}
