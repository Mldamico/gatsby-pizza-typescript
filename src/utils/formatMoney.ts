const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatMoney = (cents: number) => {
  return formatter.format(cents / 100);
};
