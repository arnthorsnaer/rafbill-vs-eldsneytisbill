# Technical implementation status

*Updated: 2026-11-03. This is the canonical local technical handoff, not a record of user/vault decisions.*

## Approved product direction

The next selector MVP replaces the currently deployed selector UI with a persistent dual vehicle selector available across all sections. It compares a user-selected EV with a user-selected fuel-side vehicle across 100 km, ISK 1,000, five-year, and lifetime scenarios.

- No PHEVs: Ford Kuga PHEV and its calculation path are to be removed.
- Fuel options must be visibly grouped as **Bensín**, **Dísel**, and **Hybrid**.
- Do not foreground cargo/seat mismatch comparisons in the UI. Sourced caveats belong in `Nánar`/documentation.
- Missing historical efficiency evidence must use an editable, source-unknown state in the short-distance sections—not invented consumption presets.
- Only lifetime ownership uses non-zero editable illustrative maintenance/reserve scenario defaults. They are not reliability forecasts.

## Target roster

### EV

| Vehicle | Efficiency status |
| --- | --- |
| Tesla Model Y RWD (2022) | Exact historic primary consumption source unavailable; user-entered/source-unknown. |
| Škoda Enyaq iV 80 150 kW RWD (2022) | Sourced WLTP. |
| VW ID.4 Pro Performance 77 kWh RWD (MY21) | Sourced WLTP. |
| Hyundai Ioniq 5 72.6 RWD Premium (MY21) | Sourced WLTP. |
| Ford Mustang Mach-E Extended Range RWD (2021) | Exact historic consumption source unavailable; user-entered/source-unknown. |
| Volvo XC40 Recharge Twin (2021) | Sourced preliminary rating; editable and marked preliminary. |

### Fuel side

| Group | Vehicle | Efficiency status |
| --- | --- | --- |
| Bensín | Škoda Kodiaq 1.5 TSI ACT 150 (2021) | Sourced WLTP. |
| Bensín | Mazda CX-5 2.0 165 (2021) | Sourced WLTP. |
| Dísel | VW Tiguan Allspace 2.0 TDI 150 DSG FWD (MY21) | Sourced WLTP. |
| Dísel | Peugeot 5008 1.5 BlueHDi 130 EAT8 (2021) | Exact MY21 source unavailable; user-entered/source-unknown. |
| Hybrid | Toyota RAV4 2.5 Hybrid AWD-i (2021) | Sourced HEV WLTP. |
| Hybrid | Hyundai Tucson N Line 1.6 T-GDi 230 PS Hybrid 2WD (2021) | Sourced non-plug-in HEV WLTP 5.8 L/100 km. |

## Sources and assumptions

Dated Icelandic tariffs/petrol snapshot, vehicle citations, and source limits live in `data/assumptions.md`; structured values live in `data/defaults.json`.

- Current-price values require revalidation immediately before any future deployment.
- WLTP values are rated test values, not Icelandic winter/real-world outcomes.
- Maintenance and major-repair reserves are transparent, non-zero, editable lifetime planning assumptions only.
- Tucson European relevance evidence is not an Iceland sales/ranking claim.

## Current implementation state

`main` currently contains deployed commit `4f1cfa4` (selector MVP), which is superseded for the next iteration because it includes Kuga PHEV, a static selector placement, and scenario efficiency defaults for evidence-gap vehicles.

Corrected selector implementation is complete locally and validated. It is uncommitted and must not be pushed or deployed before the next user-review gate.

## Validation and release

The deployed iteration previously passed `npm run check` (unit tests plus static smoke check) and browser validation. The corrected iteration requires the same local checks and browser validation before user review.

Do not push/deploy the corrected iteration until the user-review gate is satisfied. Do not alter the legacy redirect.

## Next review gate

After implementing the corrected persistent selector, report: roster and grouping, source-unknown input UX, lifetime-only scenario values, removed PHEV logic, validation results, and remaining source gaps. User review is required before replacement deployment.
