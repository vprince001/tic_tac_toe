const { font, repeatString } = require("./utilLib.js");

const selectBanner = function() {
  let randomNumer = Math.ceil(Math.random()*4);

  let banner = {
    1 : generateBanner1(),
    2 : generateBanner2(),
    3 : generateBanner3(),
    4 : generateBanner4()
  };

  return banner[randomNumer];
};

const generateBanner1 = function() {

  let dashes = font("violet", repeatString("≈", 21));
  let l = font("yellow", "|");
  let borderLine = dashes + l;
  borderLine += repeatString(borderLine, 3);
  borderLine += dashes + "\n";

  let specialName = font("green", "¥  †¡ç - †åç - †ø£  ¥");
  let simpleName = font("red",  "¥  TIC - TAC - TOE  ¥");
  
  let nameLine = specialName + l + simpleName + l;
  nameLine += nameLine + specialName + "\n";

  let banner = "\n";
  banner += repeatString(borderLine,2) + nameLine;
  banner += repeatString(borderLine,2);
  return banner;
};

const createLines = function(tic, tac, toe, border) {
  let lines = {};
  lines.ticLine    = repeatString(tic, 5) + "\n";
  lines.tacLine    = repeatString(tac, 5) + "\n";
  lines.toeLine    = repeatString(toe, 5) + "\n";
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
  let tic    = font("red",    "   | T | I | C |   ");
  let tac    = font("red",    "   | T | A | C |   ");
  let toe    = font("red",    "   | T | O | E |   ");
  let border = font("yellow", "   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner3 = function() {
  let tic    = font("yellow", "   | t | i | c |   ");
  let tac    = font("yellow", "   | t | a | c |   ");
  let toe    = font("yellow", "   | t | o | e |   ");
  let border = font("green",  "   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

const generateBanner4 = function() {
  let tic    = font("green", "   | † | ¡ | ç |   ");
  let tac    = font("green", "   | † | å | ç |   ");
  let toe    = font("green", "   | † | ø | ç |   ");
  let border = font("red",   "   +---+---+---+   ");

  let lines = createLines(tic, tac, toe, border);
  let banner = getBanner(lines);
  return banner;
};

module.exports = { selectBanner };
