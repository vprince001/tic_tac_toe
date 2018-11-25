const readline = require('readline-sync');

const { color, repeatChar } = require("./utilLib.js");
const { selectBanner } = require('./bannerLib.js');

const retrieveGameData = function() {
  let game = {};
  game.banner = selectBanner();

  game.board = {};
  game.board.data = createBoardData();
  game.board.frame = createBoard(game.board.data);

  console.clear();
  console.log(game.banner);
  game.modeNumber = readGameModeInput();
  
  game.players = { player1 : {}, player2 : {} };
  game.players = readPlayerName(game.modeNumber, game.players);

  let firstSymbol = readFirstSymbol(game.players.player1.name);
  game.players = assignSymbols(firstSymbol, game.players);

  game.players = createInputArrays(game.players);
  return game;
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

const readPlayerName = function(modeNumber, players) {
  let retrieveNames = readSinglePlayerName;
  if(modeNumber == '2') {
    retrieveNames = readDoublePlayersName;
  }
  return retrieveNames(players);
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

const startGame = function(game) {

  game.turn = 'player1';
  let switchPlayer = switchTurn();
  updateScreen(game.banner, game.board.frame);

  for(let currentMove = 1; currentMove < 10; currentMove++) {

    let name = game.players[game.turn].name;
    let symbol = game.players[game.turn].symbol;
    let executeMove = executePlayerMove;

    if(name == color("green", "Computer")) {
      executeMove = executeBotMove;
    }

    game = executeMove(game, name, symbol, game.turn);

    if(checkWin(game.players[game.turn].inputs)) { 
      currentMove = declareWinner(name, game.board.frame, game.banner)
    }

    if(currentMove == 9) {
      declareDraw(game.board.frame, game.banner);
    }
    game.turn = switchPlayer();
  }
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

const executePlayerMove = function(game, name, symbol, turn) {
  input = +readPlayerInput(name, symbol);
  
  while(!isBlockFree(input, game.board.data, game.players)) {
    console.log("Sorry, this block is already occupied. Please try again.");
    input = +readPlayerInput(name, symbol);
  }
  
  insertSymbol(game, turn, symbol, input);
  updateScreen(game.banner, game.board.frame);
  return game;
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

const insertSymbol = function(game, turn, symbol, input) {
  game.board.data[input] = symbol;
  game.players[turn].inputs.push(input);
  game.board.frame = createBoard(game.board.data);
};

const executeBotMove = function(game, name, symbol, turn) {
  let input = +Math.ceil(Math.random()*9);

  while(!isBlockFree(input, game.board.data, game.players)) {
    input = +Math.ceil(Math.random()*9);
  }

  insertSymbol(game, turn, symbol, input);
  
  updateScreen(game.banner, game.board.frame);
  readline.question(name+" input is "+input+". Press enter to continue.");
  return game;
};

const checkWin = function(playerInputs) {
  let winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  return winConditions.some(function(element) {
    return isSubset(playerInputs, element)
  })
};

const isSubset = function(superSet, subsetCandidate) {
  return subsetCandidate.every(function(element) {
    return superSet.includes(element);
  })
};

const declareWinner = function(name, frame, banner) {
  let starLine = color("violet", repeatChar("*", 37));
  let winMsg = color("red" , "won the game !"); 
  console.log(starLine, name, winMsg, starLine);
  return 10;
};

const declareDraw = function(frame, banner) {
  let starLine = color("violet", repeatChar("*", 42));
  let drawMsg = color("green"," IT'S A DRAW ");
  let msg = starLine + drawMsg + starLine;

  console.log(msg);
};

module.exports = { retrieveGameData, startGame };
