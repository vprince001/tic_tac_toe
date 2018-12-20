const { equal, deepEqual } = require("assert");

const {
  changeFont,
  repeatString,
  changeFontColor,
  changeFontStyle,
  createArray,
  createLine,
  assignSecondSymbol
} = require("../src/utilLib.js");

describe("changeFont", function() {
  it("should return red text for red as first argument", function() {
    equal(changeFont("red", "hello"), "\033[31mhello\033[0m");
  });

  it("should return green text for green as first argument", function() {
    equal(changeFont("green", "hello"), "\033[32mhello\033[0m");
  });

  it("should return yellow text for yellow as first argument", function() {
    equal(changeFont("yellow", "hello"), "\033[33mhello\033[0m");
  });

  it("should return blue text for blue as first argument", function() {
    equal(changeFont("blue", "hello"), "\033[34mhello\033[0m");
  });

  it("should return violet text for violet as first argument", function() {
    equal(changeFont("violet", "hello"), "\033[35mhello\033[0m");
  });

  it("should return cyan text for cyan as first argument", function() {
    equal(changeFont("cyan", "hello"), "\033[36mhello\033[0m");
  });

  it("should return white text for white as first argument", function() {
    equal(changeFont("white", "hello"), "\033[37mhello\033[0m");
  });

  it("should return bold text for b as third argument", function() {
    equal(
      changeFont("red", "hello", "b"),
      "\033[1m\033[31mhello\033[0m\033[0m"
    );
  });

  it("should return italic text for i as third argument", function() {
    equal(
      changeFont("green", "hello", "i"),
      "\033[3m\033[32mhello\033[0m\033[0m"
    );
  });

  it("should return underline text for u as third argument", function() {
    equal(
      changeFont("yellow", "hello", "u"),
      "\033[4m\033[33mhello\033[0m\033[0m"
    );
  });
});

describe("changeFontColor", function() {
  it("should return red text for red as first argument", function() {
    equal(changeFontColor("red", "hello"), "\033[31mhello\033[0m");
  });

  it("should return green text for green as first argument", function() {
    equal(changeFontColor("green", "hello"), "\033[32mhello\033[0m");
  });

  it("should return yellow text for yellow as first argument", function() {
    equal(changeFontColor("yellow", "hello"), "\033[33mhello\033[0m");
  });

  it("should return blue text for blue as first argument", function() {
    equal(changeFontColor("blue", "hello"), "\033[34mhello\033[0m");
  });

  it("should return violet text for violet as first argument", function() {
    equal(changeFontColor("violet", "hello"), "\033[35mhello\033[0m");
  });

  it("should return cyan text for cyan as first argument", function() {
    equal(changeFontColor("cyan", "hello"), "\033[36mhello\033[0m");
  });

  it("should return white text for white as first argument", function() {
    equal(changeFontColor("white", "hello"), "\033[37mhello\033[0m");
  });
});

describe("changeFontStyle", function() {
  it("should return bold text for b as second argument", function() {
    equal(changeFontStyle("hello", "b"), "\033[1mhello\033[0m");
  });

  it("should return italic text for i as second argument", function() {
    equal(changeFontStyle("hello", "i"), "\033[3mhello\033[0m");
  });

  it("should return underline text for u as second argument", function() {
    equal(changeFontStyle("hello", "u"), "\033[4mhello\033[0m");
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
  let v = "\033[35m",
    r = "\033[0m";
  let l1 = "| ",
    l2 = " | ",
    l3 = " |";
  let A = "A",
    B = "B",
    C = "C";

  let expectedOutput = s + v + l1 + r + A + v + l2 + r;
  expectedOutput += B + v + l2 + r + C + v + l3 + r + "\n";

  it("should return a concatenated string of given inputs with violet '|' in between", function() {
    equal(createLine(s, A, B, C), expectedOutput);
  });
});

describe("assignSecondSymbol", function() {
  it("should return yellow o", function() {
    equal(
      assignSecondSymbol(changeFont("red", "x")),
      changeFont("yellow", "o")
    );
  });

  it("should return yellow x", function() {
    equal(
      assignSecondSymbol(changeFont("red", "o")),
      changeFont("yellow", "x")
    );
  });
});
