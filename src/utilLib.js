const readline = require("readline-sync");

const font = function(selectedColor, text, style) {
  let fontStyle = { 
    red    : "\033[31m",
    green  : "\033[32m",
    yellow : "\033[33m",
    blue   : "\033[34m",
    violet : "\033[35m",
    cyan   : "\033[36m",
    white  : "\033[37m",
    b      : "\033[1m",
    i      : "\033[3m",
    u      : "\033[4m",
  };

  let result;
  if(style) {
    result  = fontStyle[style] + fontStyle[selectedColor];
    result += text + "\033[0m";
    return result;
  }

  return fontStyle[selectedColor] + text + "\033[0m";
};

const repeatString = function(string, times) {
  return new Array(times).fill(string).join("");
};

const createArray = function(size, character) {
  return new Array(size).fill(character);
};

const createLine = function(spaces, first, second, third) {
  let line = spaces;
  line    += font("violet", "| ")  + first;
  line    += font("violet", " | ") + second;
  line    += font("violet", " | ") + third;
  line    += font("violet", " |")  + "\n";

  return line;
};

const readGameModeInput = function() {
  let validInputMsg = "Please enter 1 for single player and 2 for double player\n";
  let invalidInputMsg = "Only two modes are available. ";
  invalidInputMsg += "You can either choose 1 or 2.\n";

  let modeNumber = readline.question(validInputMsg).toString();

  while(modeNumber != '1' && modeNumber != '2') {
    modeNumber = readline.question(invalidInputMsg);
  }
  return modeNumber;
};

const readFirstName = function(gameMode) {
  let msg = "\nPlease enter your name : ";
  if(gameMode == 2) { 
    msg = "\nPlease enter first player's name : ";
  }
  return font("blue", readline.question(msg));
};

const readSecondName = function(gameMode) {
  let name = font("green", "Computer");
  if(gameMode == 2) {
    let msg = "Player enter second player's name : ";
    name = font("green", readline.question(msg));
  }
  return name;
};
  
const readFirstSymbol = function(player1Name) {
  let msgForSymbol = "Choose your symbol either 'x' or 'o' : ";
  let msgForInvalidSymbol = "Valid symbols are 'x' or 'o'. Please choose one from these only : "
  
  let firstSymbol = readline.question("\n"+player1Name+", "+msgForSymbol);
  
  while(firstSymbol != "x" && firstSymbol != "o") {
     firstSymbol = readline.question("\n"+player1Name+", "+msgForInvalidSymbol);
  }
  return font("red", firstSymbol);
};

const assignSecondSymbol = function(firstSymbol) {
  let secondSymbol = font("yellow", "o");

  if(firstSymbol == font("red", "o")) {
    secondSymbol = font("yellow", "x");
  }
  return secondSymbol;
};

const switchTurn = function() {
  let player = { 0 : 'player1', 1 : 'player2' }
  let turn = 0;

  return function() {
    turn = 1-turn;
    return player[turn];
  }
};

const updateScreen = function(banner, frame) {
  console.clear();
  console.log(banner);
  console.log(frame);
};

const readPlayerInput = function(name, symbol) {
  let msgForInput = "Enter number between 1 to 9\n";
  let msgForInvalidInput = "Entered game is not valid. Please enter number between 1 to 9 only.\n";
  console.log("\nTurn of",name,":",symbol);

  let input = readline.questionInt(msgForInput);
  while(input < 1 || input > 9) {
    input = readline.questionInt(msgForInvalidInput);
  }

  return input;
};

const isBlockFree = function(input, boardData, players) {
  let status = true;

  if(boardData[input] == players.player1.symbol || boardData[input] == players.player2.symbol) {
    status = false;
  }
  return status;
};

const isSubset = function(superSet, subsetCandidate) {
  return subsetCandidate.every(function(element) {
    return superSet.includes(element);
  })
};

module.exports = { 
  font, repeatString,
  createArray, createLine,
  readGameModeInput, isSubset,
  readFirstName, readSecondName,
  readFirstSymbol, assignSecondSymbol,
  switchTurn, updateScreen,
  readPlayerInput, isBlockFree
};
