const multiplier = w => (w === "SELL" || w === "DOWN" ? -1 : 1);
const outflows = v => v < 0;
const inflows = v => v > 0;
const sum = (a, v) => a + v;
const sortAndJoin = a => a.sort((a, b) => a.localeCompare(b)).join("\n");

module.exports = {
  multiplier,
  outflows,
  inflows,
  sum,
  sortAndJoin
};
