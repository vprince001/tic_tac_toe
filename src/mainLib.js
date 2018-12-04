const readline = require("readline-sync");

const { 
  changeFont, repeatString,
  createArray, createLine,
  readGameModeInput, readPlayerInput,
  readFirstName, readSecondName,
  readFirstSymbol, assignSecondSymbol,
  switchTurn, updateScreen,
  isBlockFree, isSubset,
  readFile, writeFile
} = require("./utilLib.js");

const { selectBanner } = require('./bannerLib.js');

const retrieveGameData = function() {
  let game = { banner : selectBanner() };
  game.logFile = "./src/.log.txt";

  game.board = { data : createArray(10, " ") };
  game.board.frame = createBoard(game.board.data);

  console.clear();
  console.log(game.banner);
  game.gameMode = readGameModeInput();
  
  let logData = readFile(game.logFile);

  game.players = { player1 : {}, player2 : {} };

  let player1Name = readFirstName(game.gameMode);
  logData[player1Name] = {};
  game.players.player1.name = changeFont('blue', player1Name) 

  let player2Name = readSecondName(game.gameMode);
  logData[player2Name] = {};
  game.players.player2.name = changeFont('green', player2Name);

  writeFile(game.logFile, logData);

  game.players.player1.symbol = readFirstSymbol(game.players.player1.name);
  game.players.player2.symbol = assignSecondSymbol(game.players.player1.symbol);

  game.players.player1.inputs = [];
  game.players.player2.inputs = [];
  return game;
};

const createBoard = function (boardData){
  let spaces = repeatString(" ", 41);

  let firstLine  = createLine(spaces, boardData[1], boardData[2], boardData[3]);
  let secondLine = createLine(spaces, boardData[4], boardData[5], boardData[6]);
  let thirdLine  = createLine(spaces, boardData[7], boardData[8], boardData[9]);
  let border = spaces + changeFont("violet", "+---+---+---+") + "\n";

  let board = border + firstLine + border + secondLine + border + thirdLine + border;
  return board;
};

const startGame = function(game) {

  game.turn = 'player1';
  let switchPlayer = switchTurn();
  updateScreen(game.banner, game.board.frame);

  for(let currentMove = 1; currentMove < 10; currentMove++) {

    let name = game.players[game.turn].name;
    let symbol = game.players[game.turn].symbol;
    let executeMove = executePlayerMove;

    if(name == changeFont("green", "Computer")) {
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
  console.log(name+" input is "+input+".");
  return game;
};

const checkWin = function(playerInputs) {
  let winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  return winConditions.some(function(element) {
    return isSubset(playerInputs, element)
  })
};

const declareWinner = function(name, frame, banner) {
  let starLine = changeFont("violet", repeatString("*", 37));
  let winMsg = changeFont("red" , "won the game !"); 
  console.log(starLine, name, winMsg, starLine);
  return 10;
};

const declareDraw = function(frame, banner) {
  let starLine = changeFont("violet", repeatString("*", 42));
  let drawMsg = changeFont("green"," IT'S A DRAW ");
  let msg = starLine + drawMsg + starLine;

  console.log(msg);
};

module.exports = { retrieveGameData, startGame };
