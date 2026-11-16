// Valorile fixe și etichetele lor, într-un singur loc.
export const PLATFORME = [
  { value: "pc", label: "PC" },
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
];

// { pc: "PC", playstation: "PlayStation", xbox: "Xbox" }
export const ETICHETE_PLATFORMA = Object.fromEntries(
  PLATFORME.map((p) => [p.value, p.label])
);
