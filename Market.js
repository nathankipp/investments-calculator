const _ = require("lodash");

module.exports = class Market {
  constructor() {
    this.stocks = [];
  }
  setPrice(ticker, price) {
    this.stocks.push({ ticker, price });
  }
  getPrice(ticker) {
    return _.findLast(this.stocks, s => s.ticker === ticker).price;
  }
};
