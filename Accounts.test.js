const Accounts = require("./Accounts");

describe("Accounts", () => {
  let accounts;
  beforeEach(() => {
    accounts = new Accounts();
  });

  it("stores investor accounts", () => {
    expect(accounts.records).toEqual({});
  });

  describe("methods", () => {
    let nathans;
    beforeEach(() => {
      accounts.placeOrder({
        owner: "nathan",
        ticker: "foo",
        order: 10,
        price: 2
      });
      nathans = accounts.getRecord("nathan");
    });

    it("placeOrder() opens new accounts", () => {
      expect(nathans.transactions).toEqual([-20]);
      expect(nathans.holdings.foo).toBe(10);
    });

    it("placeOrder() handles buy orders", () => {
      accounts.placeOrder({
        owner: "nathan",
        ticker: "foo",
        order: 1,
        price: 2
      });
      expect(nathans.transactions).toEqual([-20, -2]);
      expect(nathans.holdings.foo).toBe(11);
    });

    it("placeOrder() handles sell orders", () => {
      accounts.placeOrder({
        owner: "nathan",
        ticker: "foo",
        order: -1,
        price: 2
      });
      expect(nathans.transactions).toEqual([-20, 2]);
      expect(nathans.holdings.foo).toBe(9);
    });
  });
});
