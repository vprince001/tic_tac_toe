const colors = require("colors");
const { repeatString } = require("./utilLib.js");

const selectBanner = function() {
  let randomNumer = Math.ceil(Math.random() * 5);

  let banner = {
    1: generateBanner1(),
    2: generateBanner2(),
    3: generateBanner3(),
    4: generateBanner4(),
    5: generateBanner5()
  };

  return banner[randomNumer];
};

const generateBanner1 = function() {
  let dashes = colors.magenta(repeatString("≈", 21));
  let l = colors.yellow("|");
  let borderLine = dashes + l;
  borderLine += repeatString(borderLine, 3);
  borderLine += dashes + "\n";

  let specialName = colors.green("¥  †¡ç - †åç - †ø£  ¥");
  let simpleName = colors.red("¥  TIC - TAC - TOE  ¥");

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
  let tic = colors.red("   | T | I | C |   ");
  let tac = colors.red("   | T | A | C |   ");
  let toe = colors.red("   | T | O | E |   ");
  let border = colors.yellow("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner3 = function() {
  let tic = colors.yellow("   | t | i | c |   ");
  let tac = colors.yellow("   | t | a | c |   ");
  let toe = colors.yellow("   | t | o | e |   ");
  let border = colors.green("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner4 = function() {
  let tic = colors.green("   | † | ¡ | ç |   ");
  let tac = colors.green("   | † | å | ç |   ");
  let toe = colors.green("   | † | ø | ç |   ");
  let border = colors.red("   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner5 = function() {
  let tic = "   | † | ¡ | ç |   ";
  let tac = "   | † | å | ç |   ";
  let toe = "   | † | ø | ç |   ";
  let border = "   +---+---+---+   ";

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return colors.rainbow(banner);
};

module.exports = { selectBanner };
