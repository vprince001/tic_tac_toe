const readline = require("readline-sync");

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

const repeatString = function(string, times) {
  return new Array(times).fill(string).join("");
};

const createBoardData = function() {
  return new Array(10).fill(" ");
};

const createLine = function(spaces, first, second, third) {
  let line = spaces;
  line    += color("violet", "| ")  + first;
  line    += color("violet", " | ") + second;
  line    += color("violet", " | ") + third;
  line    += color("violet", " |")  + "\n";

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

const readSinglePlayerName = function(players) {
  let player1msg = "\nPlease enter your name : ";

  players.player1.name = color("blue", readline.question(player1msg));
  players.player2.name = color("green", "Computer");
  return players;
};

const readDoublePlayersName = function(players) {
  let player1msg = "\nPlease enter first player's name : ";
  let player2msg = "Player enter second player's name : ";

  players.player1.name = color("blue", readline.question(player1msg));
  players.player2.name = color("green", readline.question(player2msg));
  return players;
};

const readFirstSymbol = function(player1Name) {
  let msgForSymbol = "Choose your symbol either 'x' or 'o' : ";
  let msgForInvalidSymbol = "Valid symbols are 'x' or 'o'. Please choose one from these only : "
  
  let firstSymbol = readline.question("\n"+player1Name+", "+msgForSymbol);
  
  while(firstSymbol != "x" && firstSymbol != "o") {
     firstSymbol = readline.question("\n"+player1Name+", "+msgForInvalidSymbol);
  }
  return firstSymbol;
};

const assignSymbols = function(firstSymbol, players) {
  
  players.player1.symbol = color("red", firstSymbol);
  players.player2.symbol = color("yellow", "x");

  if(players.player1.symbol == color("red", "x")) {
    players.player2.symbol = color("yellow", "o");
  }
  return players;
};

const createInputArrays = function(players) {
  players.player1.inputs = [];
  players.player2.inputs = [];
  return players;
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
  console.log("\nTurn of",color('blue',name),":",symbol);

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
  color, repeatString,
  createBoardData, createLine, readGameModeInput,
  readSinglePlayerName, readDoublePlayersName,
  readFirstSymbol, assignSymbols, createInputArrays,
  switchTurn, updateScreen, readPlayerInput,
  isBlockFree, isSubset
};
