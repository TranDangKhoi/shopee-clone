export function formatCurrency(value: number) {
  return new Intl.NumberFormat("de-DE").format(value);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .toLowerCase()
    .replace(".", ",");
}

export function calculateSalePercent(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + "%";
}
