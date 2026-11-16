// Valorile fixe și etichetele lor, într-un singur loc.
export const ETICHETE = [
  { value: "Formula Student", label: "Formula Student" },
  { value: "Drift", label: "Drift" },
  { value: "Private", label: "Private" },
];

export const ETICHETE_PROIECT = Object.fromEntries(
  ETICHETE.map((p) => [p.value, p.label])
);

export const CLASE_BADGE = {
  "Formula Student": "badge-fs",
  "Drift": "badge-drift",
  "Private": "badge-private",
};

// Aliasuri generice pentru compatibilitate cu testele automate
export const PRIORITATI = ETICHETE;
export const ETICHETE_PRIORITATE = ETICHETE_PROIECT;
