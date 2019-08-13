const _ = require("lodash");

module.exports = class Accounts {
  constructor() {
    this.records = {};
  }

  getRecord(owner) {
    return this.records[owner];
  }

  addTransaction({ owner, order, price }) {
    if (!this.records[owner]) {
      this.records[owner] = {
        transactions: []
      };
    }
    const value = order * -price;
    this.records[owner].transactions.push(value);
  }

  updateHoldings({ owner, ticker, order }) {
    const ownersHoldings = `${owner}.holdings.${ticker}`;
    const currentShares = _.get(this.records, ownersHoldings, 0);
    _.set(this.records, ownersHoldings, currentShares + order);
  }

  placeOrder({ owner, ticker, order, price }) {
    this.addTransaction({ owner, order, price });
    this.updateHoldings({ owner, ticker, order });
  }
};
