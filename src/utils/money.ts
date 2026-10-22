const USD_TO_INR = 95;
export function money(price: number) {
  return Math.round(price * USD_TO_INR);
}