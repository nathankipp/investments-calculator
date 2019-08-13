const readline = require("readline");
const _ = require("lodash");
const Market = require("./Market");
const Accounts = require("./Accounts");

function createStore() {
  return {
    market: new Market(),
    accounts: new Accounts()
  };
}

const multiplier = w => (w === "SELL" || w === "DOWN" ? -1 : 1);
function processLine(command, { market, accounts }) {
  const words = command.split(" ");
  let ticker, price;
  switch (words[1]) {
    case "PRICE":
      ticker = words[2];
      price = Number(words[3].slice(1));
      market.setPrice(ticker, price);
      break;
    case "DOWN":
    case "UP":
      ticker = words[0];
      const currentPrice = market.getPrice(ticker);
      const priceChange =
        multiplier(words[1]) * Number(words[2].replace(/\D/, ""));
      let newPrice;
      if (words[2].startsWith("$")) {
        newPrice = currentPrice + priceChange;
      } else {
        newPrice = currentPrice + (currentPrice * priceChange) / 100;
      }
      market.setPrice(ticker, newPrice);
      break;
    case "BUY":
    case "SELL":
      const owner = words[0];
      const order = multiplier(words[1]) * Number(words[2]);
      ticker = words[3];
      price = market.getPrice(ticker);
      accounts.placeOrder({ owner, order, ticker, price });
      break;
  }
  return { market, accounts };
}

const outflows = v => v < 0;
const inflows = v => v > 0;
const sum = (a, v) => a + v;
function displayAccounts({ market, accounts }) {
  const holdingsValues = (net, shares, ticker) =>
    net.push(shares * market.getPrice(ticker));
  const summaries = [];
  _.forIn(accounts.records, (account, name) => {
    const expenses = account.transactions.filter(outflows).reduce(sum, 0) * -1;
    const proceeds = account.transactions.filter(inflows).reduce(sum, 0);
    const endingValue =
      _.transform(account.holdings, holdingsValues, []).reduce(sum, 0) +
      proceeds;
    const relativeDelta = (100 * (endingValue - expenses)) / expenses;
    summaries.push(
      `${name} SPENT $${expenses.toFixed(
        0
      )} AND ENDED WITH $${endingValue.toFixed(0)}, A ${relativeDelta.toFixed(
        2
      )}% RETURN`
    );
  });
  return summaries.sort((a, b) => a.localeCompare(b)).join("\n");
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== "TEST") {
  let store = createStore();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("line", line => {
    store = processLine(line, store);
  });
  rl.on("close", () => {
    console.log("---");
    console.log(displayAccounts(store));
  });
}

module.exports = {
  createStore,
  processLine,
  displayAccounts
};
