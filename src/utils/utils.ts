export const convertCentToEth = (price: number): number => {
  /**Price 29th  */
  const res = price * 0.00058;
  return parseFloat(res.toFixed(5));
};

export const convertEthToCent = (price: number): number => {
  const res = price / 0.00058;
  return parseFloat(res.toFixed(5));
};

export const convertEurToCent = (price: number) => {
  return price * 100;
};
