const readline = require("readline");
const _ = require("lodash");
const Market = require("./Market");
const Accounts = require("./Accounts");
const { multiplier, outflows, inflows, sum, sortAndJoin } = require("./lib");

function createStore() {
  return {
    market: new Market(),
    accounts: new Accounts()
  };
}

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

function displayAccounts({ market, accounts }) {
  const summaries = [];

  const holdingsValues = (net, shares, ticker) =>
    net.push(shares * market.getPrice(ticker));

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
  return sortAndJoin(summaries);
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== "TEST") {
  let store = createStore();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.prompt(">");
  rl.on("line", line => {
    store = processLine(line, store);
    rl.prompt(">");
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
