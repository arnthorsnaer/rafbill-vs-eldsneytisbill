function valid(v,n){if(!Number.isFinite(v)||v<0)throw new Error(`${n} must be non-negative finite`)}
export function per100(price,use){valid(price,"price");valid(use,"use");return price*use}
export function energyCost(km,cost){valid(km,"km");valid(cost,"cost");return km*cost/100}
export function scenario({km,cost,maintenance=0,reserve=0}){valid(maintenance,"maintenance");valid(reserve,"reserve");const energy=energyCost(km,cost);return{energy,maintenance,reserve,total:energy+maintenance+reserve}}
export function phevPer100({electricShare,kwhPer100,homeKrPerKwh,depletedLitresPer100,petrolKrPerLitre}){valid(electricShare,"electricShare");if(electricShare>1)throw new Error("electricShare must be <= 1");return electricShare*per100(homeKrPerKwh,kwhPer100)+(1-electricShare)*per100(petrolKrPerLitre,depletedLitresPer100)}
