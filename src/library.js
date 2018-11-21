const readline = require('readline-sync');

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

const createBoard = function (boardData){
  let blankLine = "                                         ";
  let a = color("violet", "| ");
  let b = color("violet", " | ");
  let c = color("violet", " |");

  let firstLine =  blankLine+ a +boardData[1]+ b +boardData[2]+ b +boardData[3]+ c +"\n";
  let secondLine = blankLine+ a +boardData[4]+ b +boardData[5]+ b +boardData[6]+ c +"\n";
  let thirdLine  = blankLine+ a +boardData[7]+ b +boardData[8]+ b +boardData[9]+ c +"\n";
  let border = blankLine + color("violet", "+---+---+---+") + "\n";

  let board = border + firstLine + border + secondLine + border + thirdLine + border;
  return board;
};

const readGameModeInput = function() {
  let validInputMsg = "Please enter 1 for single player and 2 for double player\n";
  let invalidInputMsg = "Only two modes are available. ";
  invalidInputMsg += "You can either choose 1 or 2.\n";

  let modeNumber = +readline.questionInt(validInputMsg);

  while(modeNumber < 1 || modeNumber > 2) {
    modeNumber = +readline.questionInt(invalidInputMsg);
  }
  return modeNumber;
};

const callReadPlayerName = function(modeNumber) {
  let retrieveNames = readDoublePlayersName;
  if(modeNumber == 1) {
    retrieveNames = readSinglePlayerName;
  }
  return retrieveNames();
};

const readSinglePlayerName = function() {
  let names = {};
  names.firstName = color("blue",readline.question("Please enter your name : "));
  names.secondName = color("green","Computer");
  return names;
};

const readDoublePlayersName = function() {
  let names = {};
  names.firstName = color("blue",readline.question("Please enter first player's name : "));
  names.secondName = color("green",readline.question("Please enter second player's name : "));
  return names;
};

exports.createBoard = createBoard;
exports.readGameModeInput = readGameModeInput;
exports.callReadPlayerName = callReadPlayerName;
