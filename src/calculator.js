/** Transparent energy-only operating-cost calculations; values are inputs, not live prices. */
export function krPer100Km({ unitPriceKr, consumptionPer100Km }) {
  if (!Number.isFinite(unitPriceKr) || !Number.isFinite(consumptionPer100Km) || unitPriceKr < 0 || consumptionPer100Km < 0) throw new Error("Inputs must be non-negative finite numbers.");
  return unitPriceKr * consumptionPer100Km;
}

export function annualCost({ krPer100Km: cost, annualKm }) {
  if (!Number.isFinite(cost) || !Number.isFinite(annualKm) || cost < 0 || annualKm < 0) throw new Error("Inputs must be non-negative finite numbers.");
  return Number((cost * annualKm / 100).toFixed(2));
}

export function comparison(defaults) {
  const home = krPer100Km({ unitPriceKr: defaults.homeChargingKrPerKwh, consumptionPer100Km: defaults.evKwhPer100Km });
  const fast = krPer100Km({ unitPriceKr: defaults.fastChargingKrPerKwh, consumptionPer100Km: defaults.evKwhPer100Km });
  const fuel = krPer100Km({ unitPriceKr: defaults.fuelKrPerLitre, consumptionPer100Km: defaults.fuelLitresPer100Km });
  return { homeKrPer100Km: home, fastKrPer100Km: fast, fuelKrPer100Km: fuel, homeAnnualKr: annualCost({ krPer100Km: home, annualKm: defaults.annualKm }), fastAnnualKr: annualCost({ krPer100Km: fast, annualKm: defaults.annualKm }), fuelAnnualKr: annualCost({ krPer100Km: fuel, annualKm: defaults.annualKm }) };
}
