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

const repeatChar = function(character, times) {
  return new Array(times).fill(character).join("");
};

const repeatString = function(string, times) {
  return new Array(times).fill(string).join("");
};

const createBoardData = function() {
  return new Array(10).fill(" ");
};

const createBoard = function (boardData){
  let spaces = repeatChar(" ", 41);

  let firstLine  = createLine(spaces, boardData[1], boardData[2], boardData[3]);
  let secondLine = createLine(spaces, boardData[4], boardData[5], boardData[6]);
  let thirdLine  = createLine(spaces, boardData[7], boardData[8], boardData[9]);
  let border = spaces + color("violet", "+---+---+---+") + "\n";

  let board = border + firstLine + border + secondLine + border + thirdLine + border;
  return board;
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

module.exports = { 
  color, repeatChar, repeatString,
  createBoardData, createBoard, createLine,
  readGameModeInput, readSinglePlayerName, readDoublePlayersName,
  readFirstSymbol, assignSymbols, createInputArrays,
  switchTurn, updateScreen
};
