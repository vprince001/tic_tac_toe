const chalk = require("chalk");
const { repeatString } = require("./utilLib.js");

const selectBanner = function() {
  let randomNumer = Math.ceil(Math.random() * 4);

  let banner = {
    1: generateBanner1(),
    2: generateBanner2(),
    3: generateBanner3(),
    4: generateBanner4()
  };

  return banner[randomNumer];
};

const generateBanner1 = function() {
  let dashes = chalk.magenta(repeatString("≈", 21));
  let l = chalk.yellow("|");
  let borderLine = dashes + l;
  borderLine += repeatString(borderLine, 3);
  borderLine += dashes + "\n";

  let specialName = chalk.green("¥  †¡ç - †åç - †ø£  ¥");
  let simpleName = chalk.red("¥  TIC - TAC - TOE  ¥");

  let nameLine = specialName + l + simpleName + l;
  nameLine += nameLine + specialName + "\n";

  let banner = "\n";
  banner += repeatString(borderLine, 2) + nameLine;
  banner += repeatString(borderLine, 2);
  return banner;
};

const createLines = function(tic, tac, toe, border) {
  let lines = {};
  lines.ticLine = repeatString(tic, 5) + "\n";
  lines.tacLine = repeatString(tac, 5) + "\n";
  lines.toeLine = repeatString(toe, 5) + "\n";
  lines.borderLine = repeatString(border, 5) + "\n";
  return lines;
};

const getBanner = function(lines) {
  let banner = "\n";
  banner += lines.borderLine + lines.ticLine;
  banner += lines.borderLine + lines.tacLine;
  banner += lines.borderLine + lines.toeLine;
  banner += lines.borderLine;
  return banner;
};

const generateBanner2 = function() {
  let tic = chalk.red("   | T | I | C |   ");
  let tac = chalk.red("   | T | A | C |   ");
  let toe = chalk.red("   | T | O | E |   ");
  let border = chalk.yellow("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner3 = function() {
  let tic = chalk.yellow("   | t | i | c |   ");
  let tac = chalk.yellow("   | t | a | c |   ");
  let toe = chalk.yellow("   | t | o | e |   ");
  let border = chalk.green("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner4 = function() {
  let tic = chalk.green("   | † | ¡ | ç |   ");
  let tac = chalk.green("   | † | å | ç |   ");
  let toe = chalk.green("   | † | ø | ç |   ");
  let border = chalk.red("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

module.exports = { selectBanner };
