const color = function(selectedColor,text) {
  let colors = {};
  colors.red    = "\033[31m";
  colors.green  = "\033[32m";
  colors.yellow = "\033[33m";
  colors.blue   = "\033[34m";
  colors.violet = "\033[35m";
  colors.cyan   = "\033[36m";
  colors.white  = "\033[37m";

  return colors[selectedColor] + text + colors.white;
};

const selectHeader = function() {
  let randomNumer = Math.ceil(Math.random()*3);

  let header = { 1 : generateHeader1(),
                 2 : generateHeader2(),
                 3 : generateHeader3() };

  return header[randomNumer];
};

const generateHeader1 = function() {
  let dashes = color("violet", "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈");
  let l = color("yellow", "|");
  let borderLine = dashes +l+ dashes +l+ dashes +l+ dashes +l+ dashes + "\n";
 
  let dName = color("green", "¥  †¡ç - †åç - †ø£  ¥");
  let sName = color("red",  "¥  TIC - TAC - TOE  ¥");
  let nameLine = dName +l+ sName +l+ dName +l+ sName +l+ dName + "\n";

  let header = "\n"+borderLine + borderLine + nameLine + borderLine + borderLine;
  return header;
};

const generateHeader2 = function() {
  let ticCaps       = color("red",    "   | T | I | C |   ");
  let tacCaps       = color("red",    "   | T | A | C |   ");
  let toeCaps       = color("red",    "   | T | O | E |   ");
  let borderCaps    = color("red",    "   +---+---+---+   ");

  let ticSmalls     = color("yellow", "   | t | i | c |   ");
  let tacSmalls     = color("yellow", "   | t | a | c |   ");
  let toeSmalls     = color("yellow", "   | t | o | e |   ");
  let borderSmalls  = color("yellow", "   +---+---+---+   ");

  let ticHiddens    = color("green",  "   | † | ¡ | ç |   ");
  let tacHiddens    = color("green",  "   | † | å | ç |   ");
  let toeHiddens    = color("green",  "   | † | ø | £ |   ");
  let borderHiddens = color("green",  "   +---+---+---+   ");

  let ticLine = ticHiddens + ticSmalls + ticCaps + ticSmalls + ticHiddens + "\n";
  let tacLine = tacHiddens + tacSmalls + tacCaps + tacSmalls + tacHiddens + "\n";
  let toeLine = toeHiddens + toeSmalls + toeCaps + toeSmalls + toeHiddens + "\n";
  let borderLine = borderHiddens + borderSmalls + borderCaps + borderSmalls + borderHiddens + "\n";

  let header = "\n" + borderLine + ticLine;
  header    +=        borderLine + tacLine;
  header    +=        borderLine + toeLine;
  header    +=        borderLine; 
  return header;
};

const generateHeader3 = function() {
  let a = color("red"    , "XOX");
  let b = color("green"  , "OXO");
  let c = color("yellow" , "XOX");
  let d = color("blue"   , "OXO");
  let e = color("violet" , "XOX");
  let f = color("cyan"   , "OXO");
  let g = color("white"  , "XOX");
  let l = "|";
  let repeatedXO = l+a+l+b+l+c+l+d+l+e+l+f+l+g;
  let repeatedOX = l+d+l+e+l+f+l+g+l+a+l+b+l+c;
  let XOline = repeatedXO + repeatedXO + repeatedXO + repeatedXO + l + "\n";
  let OXline = repeatedOX + repeatedOX + repeatedOX + repeatedOX + l + "\n";

  let header = "\n\n"+ XOline + OXline + XOline +"\n";
  return header;
}

module.exports = { color, selectHeader };
