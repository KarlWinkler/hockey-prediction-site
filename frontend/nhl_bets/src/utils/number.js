export const toPercentString = (num) => {
  num *= 100

  return `${num.toFixed(2)}%`
}