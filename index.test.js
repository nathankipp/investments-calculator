const { createStore, processLine, displayAccounts } = require("./index");

const tests = [
  {
    name: "processes stock price increases properly",
    lines: `INITIAL PRICE GOOG $200
INITIAL PRICE FB $200
Adam BUY 1 GOOG
Bill BUY 1 FB
GOOG UP 50%
FB UP $100`,
    output: `Adam SPENT $200 AND ENDED WITH $300, A 50.00% RETURN
Bill SPENT $200 AND ENDED WITH $300, A 50.00% RETURN`
  },
  {
    name: "processes stock price decreases properly",
    lines: `INITIAL PRICE GOOG $200
INITIAL PRICE FB $200
Adam BUY 1 GOOG
Bill BUY 1 FB
GOOG DOWN 50%
FB DOWN $100`,
    output: `Adam SPENT $200 AND ENDED WITH $100, A -50.00% RETURN
Bill SPENT $200 AND ENDED WITH $100, A -50.00% RETURN`
  },
  {
    name: "processes stock purchases properly",
    lines: `INITIAL PRICE GOOG $10
INITIAL PRICE FB $1
Adam BUY 1 GOOG
Adam BUY 1 FB`,
    output: `Adam SPENT $11 AND ENDED WITH $11, A 0.00% RETURN`
  },
  {
    name: "processes stock sales properly",
    lines: `INITIAL PRICE GOOG $10
INITIAL PRICE FB $1
Adam BUY 2 GOOG
Adam BUY 2 FB
GOOG UP 100%
Adam SELL 1 GOOG
Adam SELL 1 FB
GOOG DOWN 100%`,
    output: `Adam SPENT $22 AND ENDED WITH $22, A 0.00% RETURN`
  },
  {
    name: "case-insensitively alpha orders the final tallies",
    lines: `INITIAL PRICE GOOG $100
Bill BUY 1 GOOG
Drew BUY 1 GOOG
chad BUY 1 GOOG
Adam BUY 1 GOOG`,
    output: `Adam SPENT $100 AND ENDED WITH $100, A 0.00% RETURN
Bill SPENT $100 AND ENDED WITH $100, A 0.00% RETURN
chad SPENT $100 AND ENDED WITH $100, A 0.00% RETURN
Drew SPENT $100 AND ENDED WITH $100, A 0.00% RETURN`
  }
];

describe("index.js processing lines and displaying results", () => {
  tests.forEach(test => {
    it(test.name, done => {
      const store = createStore();
      test.lines.split(/\n/).forEach(line => processLine(line, store));
      expect(displayAccounts(store)).toEqual(test.output);
      done();
    });
  });
});
