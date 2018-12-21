const chalk = require("chalk");
const { equal, deepEqual } = require("assert");

const {
  repeatString,
  createArray,
  createLine,
  assignSecondSymbol
} = require("../src/utilLib.js");

describe("repeatString", function() {
  it("should return same string for 1 as second argument", function() {
    equal(repeatString("h", 1), "h");
  });

  it("should return concatenated string for 2 as second argument", function() {
    equal(repeatString("he12@3", 2), "he12@3he12@3");
  });

  it("should return empty string for 0 as second argument", function() {
    equal(repeatString("hello", 0), "");
  });
});

describe("createArray", function() {
  it("should return an empty array for 0 and a string as arguments", function() {
    deepEqual(createArray(0, "hello"), []);
  });

  it("should return an array of size 1 of given element", function() {
    deepEqual(createArray(1, "hello"), ["hello"]);
  });

  it("should return an array of size 5 of given element", function() {
    deepEqual(createArray(5, "hi"), ["hi", "hi", "hi", "hi", "hi"]);
  });
});

describe("createLine", function() {
  let s = " ";
  let v = "\033[35m";
  let r = "\033[39m";
  let l1 = "| ";
  let l2 = " | ";
  let l3 = " |";
  let A = "A";
  let B = "B";
  let C = "C";

  let expectedOutput = s + v + l1 + r + A + v + l2 + r;
  expectedOutput += B + v + l2 + r + C + v + l3 + r + "\n";

  it("should return a concatenated string of given inputs with violet '|' in between", function() {
    equal(createLine(s, A, B, C), expectedOutput);
  });
});

describe("assignSecondSymbol", function() {
  const expectedOutput = chalk.yellow("o");
  it("should return yellow o", function() {
    equal(assignSecondSymbol(chalk.red("x")), chalk.yellow("o"));
  });

  it("should return yellow x", function() {
    equal(assignSecondSymbol(chalk.red("o")), chalk.yellow("x"));
  });
});
