const Market = require("./Market");

describe("Market", () => {
  let mkt;
  beforeEach(() => {
    mkt = new Market();
  });

  it("has an array of stocks", () => {
    expect(mkt.stocks).toEqual([]);
  });

  describe("methods", () => {
    beforeEach(() => {
      mkt.setPrice("foo", 1);
      mkt.setPrice("bar", 2);
    });

    it("setPrice() adds objects to the market", () => {
      expect(mkt.stocks).toEqual([
        { ticker: "foo", price: 1 },
        { ticker: "bar", price: 2 }
      ]);
    });

    it("setPrice() is non-destructive", () => {
      mkt.setPrice("foo", 3);
      expect(mkt.stocks).toEqual([
        { ticker: "foo", price: 1 },
        { ticker: "bar", price: 2 },
        { ticker: "foo", price: 3 }
      ]);
    });

    it("getPrice() returns the most-recent price", () => {
      mkt.setPrice("foo", 3);
      expect(mkt.getPrice("foo")).toBe(3);
    });
  });
});
