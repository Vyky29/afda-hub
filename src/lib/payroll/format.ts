export function formatEuro(amount: number, detailed = true) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: detailed ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
