export const PRODUCTS_BY_TARIFF: Record<string, string[]> = {
  "2.0TD": ["Index Base", "Index Coste", "Index Promo", "Fijo Fácil", "Fijo Estable", "Fijo Snap", "Fijo Snap Fresh", "Fijo Snap Max", "Fijo Snap Mini", "Passpool"],
  "3.0TD": ["Index Base", "Index Coste", "Index Promo", "Fijo Fácil", "Fijo Estable", "Fijo Dyn", "Passpool"],
  "6.1TD": ["Index Base", "Index Coste", "Index Promo", "Fijo Fácil", "Fijo Estable", "Fijo Dyn", "Passpool"]
};

export const getIndexBase = (tipo: string): number => {
  switch (tipo) {
    case "Passpool":
      return 1.0; // 100%
    case "Index Promo":
      return 0.8; // 80%
    case "Fijo promoción":
      return 0.8; // 80%
    case "Index Coste":
      return 0.5; // 50%
    default:
      return 0.65; // 65%
  }
};
