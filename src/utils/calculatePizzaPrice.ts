const sizes: { [K: string]: number } = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export const calculatePizzaPrice = (cents: number, size: string): number => {
  return cents * sizes[size];
};
