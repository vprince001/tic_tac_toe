const readline = require("readline-sync");

const { 
  color, repeatChar, createBoardData,
  createBoard, createLine, readGameModeInput,
  readSinglePlayerName, readDoublePlayersName,
  readFirstSymbol, assignSymbols, createInputArrays } = require("./utilLib.js");

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

const readPlayerName = function(modeNumber, players) {
  let retrieveNames = readSinglePlayerName;
  if(modeNumber == '2') {
    retrieveNames = readDoublePlayersName;
  }
  return retrieveNames(players);
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
  console.log(name+" input is "+input+".");
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
