const color = function(selectedColor,text) {
  let colors = { 
    red    : "\033[31m",
    green  : "\033[32m",
    yellow : "\033[33m",
    blue   : "\033[34m",
    violet : "\033[35m",
    cyan   : "\033[36m",
    white  : "\033[37m"
  };

  return colors[selectedColor] + text + colors.white;
};

const repeatChar = function(character, times) {
  return new Array(times).fill(character).join("");
}

const repeatString = function(string, times) {
  return new Array(times).fill(string).join("");
};

const selectHeader = function() {
  let randomNumer = Math.ceil(Math.random()*4);

  let header = {
    1 : generateHeader1(),
    2 : generateHeader2(),
    3 : generateHeader3(),
    4 : generateHeader4()
  };

  return header[randomNumer];
};

const generateHeader1 = function() {

  let dashes = color("violet", repeatChar("≈", 21));
  let l = color("yellow", "|");
  let borderLine = dashes + l;
  borderLine += repeatString(borderLine, 3);
  borderLine += dashes + "\n";

  let specialName = color("green", "¥  †¡ç - †åç - †ø£  ¥");
  let simpleName = color("red",  "¥  TIC - TAC - TOE  ¥");
  
  let nameLine = specialName + l + simpleName + l;
  nameLine += nameLine + specialName + "\n";

  let header = "\n";
  header += repeatString(borderLine,2) + nameLine;
  header += repeatString(borderLine,2);
  return header;
};

const generateHeader2 = function() {
  let tic    = color("red",    "   | T | I | C |   ");
  let tac    = color("red",    "   | T | A | C |   ");
  let toe    = color("red",    "   | T | O | E |   ");
  let border = color("yellow", "   +---+---+---+   ");

  let ticLine    = repeatString(tic, 5) + "\n";
  let tacLine    = repeatString(tac, 5) + "\n";
  let toeLine    = repeatString(toe, 5) + "\n";
  let borderLine = repeatString(border, 5) + "\n";

  let header = "\n";
  header += borderLine + ticLine;
  header += borderLine + tacLine;
  header += borderLine + toeLine;
  header += borderLine; 
  return header;
};

const generateHeader3 = function() {
  let tic    = color("yellow", "   | t | i | c |   ");
  let tac    = color("yellow", "   | t | a | c |   ");
  let toe    = color("yellow", "   | t | o | e |   ");
  let border = color("green",  "   +---+---+---+   ");

  let ticLine    = repeatString(tic, 5) + "\n";
  let tacLine    = repeatString(tac, 5) + "\n";
  let toeLine    = repeatString(toe, 5) + "\n";
  let borderLine = repeatString(border, 5) + "\n";

  let header = "\n";
  header += borderLine + ticLine;
  header += borderLine + tacLine;
  header += borderLine + toeLine;
  header += borderLine; 
  return header;
};

const generateHeader4 = function() {
  let tic    = color("green", "   | † | ¡ | ç |   ");
  let tac    = color("green", "   | † | å | ç |   ");
  let toe    = color("green", "   | † | ø | ç |   ");
  let border = color("red",   "   +---+---+---+   ");

  let ticLine    = repeatString(tic, 5) + "\n";
  let tacLine    = repeatString(tac, 5) + "\n";
  let toeLine    = repeatString(toe, 5) + "\n";
  let borderLine = repeatString(border, 5) + "\n";

  let header = "\n";
  header += borderLine + ticLine;
  header += borderLine + tacLine;
  header += borderLine + toeLine;
  header += borderLine; 
  return header;
};

module.exports = { color, selectHeader };
