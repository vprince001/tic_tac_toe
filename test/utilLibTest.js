const { equal, deepEqual } = require("assert");

const { 
  color, repeatString,
  createArray, createLine 
} = require("../src/utilLib.js");

describe("color", function() {

  it("should return red text for red as first argument", function() {
    equal(color("red", "hello"), "\033[31mhello\033[37m");
  });

  it("should return green text for green as first argument", function() {
    equal(color("green", "hello"), "\033[32mhello\033[37m");
  });

  it("should return yellow text for yellow as first argument", function() {
    equal(color("yellow", "hello"), "\033[33mhello\033[37m");
  });

  it("should return blue text for blue as first argument", function() {
    equal(color("blue", "hello"), "\033[34mhello\033[37m");
  });

  it("should return violet text for violet as first argument", function() {
    equal(color("violet", "hello"), "\033[35mhello\033[37m");
  });

  it("should return cyan text for cyan as first argument", function() {
    equal(color("cyan", "hello"), "\033[36mhello\033[37m");
  });

  it("should return white text for white as first argument", function() {
    equal(color("white", "hello"), "\033[37mhello\033[37m");
  });

});

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
    deepEqual(createArray(0, 'hello'), []);
  });

  it("should return an array of size 1 of given element", function() {
    deepEqual(createArray(1, 'hello'), [ "hello" ]);
  });

  it("should return an array of size 5 of given element", function() {
    deepEqual(createArray(5, 'hi'), [ "hi","hi","hi","hi","hi" ]);
  });

});

describe("createLine", function() {

  let v = "\033[35m"
  let w = "\033[37m"
  let expectedOutput = " "+v+"| "+w+"A"+v+" | "+w+"B"+v+" | "+w+"C"+v+" |"+w+"\n";
  it("should return a concatenated string of given inputs with violet '|' in between", function() {
    equal(createLine(" ", "A", "B", "C"), expectedOutput);
  });

});
