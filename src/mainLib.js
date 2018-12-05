const readline = require("readline-sync");

const { 
  changeFont, repeatString,
  createArray, createLine,
  readGameModeInput, readPlayerInput,
  readFirstName, readSecondName,
  readFirstSymbol, assignSecondSymbol,
  switchTurn, updateScreen,
  isBlockFree, isSubset,
  readFile, writeFile, 
  addPlayerRecord } = require("./utilLib.js");

const { selectBanner } = require('./bannerLib.js');

const initiateGame = function() {
  let selectedOption = displayOptions();
  executeSelectedOption(selectedOption);
  return 1;
};

const displayOptions = function() {
  console.clear();
  let msg = "Please select any one of the given options : "
  let optionsMsg = "1.Play Game\n2.Check your stats\n\n"; 
  let invalidMsg = "Valid inputs are 1, and 2 only, Please try again.\n";

  let selectedOption = readline.questionInt(msg + "\n" + optionsMsg);
  while(selectedOption < 1 || selectedOption > 2) {
    selectedOption = readline.questionInt(invalidMsg);
  }
  return selectedOption;
};

const executeSelectedOption = function(selectedOption) {
  const options = {
    1 : playGame,
    2 : displayStats,
  };

  options[selectedOption]();
};

const playGame = function() {
  game = retrieveGameData();
  startGame(game);
};

const displayStats = function() {
  let name = readline.question("\nEnter you name : ");
  name = name.toUpperCase();
  let logData = readFile("./src/.log.json");
  console.clear();

  if(logData[name]) {
    console.log("Player Name :", name);
    console.log("Total games Played :", logData[name].gamesPlayed);
    console.log("Won :", logData[name].gamesWon);
    console.log("Draw :", logData[name].gamesDraw);
    console.log("VS Bot :", logData[name].VSBot);
    console.log("VS Player :", logData[name].VSPlayer);
    return 1;
  }
  
  console.log("No record found for this name");
  return 0;
};

const retrieveGameData = function() {
  let game = { banner : selectBanner() };

  game = retrieveBoard(game);

  console.clear();
  console.log(game.banner);
  game.gameMode = readGameModeInput();
  
  game.players = { player1 : {}, player2 : {} };

  let player1Name = readFirstName(game.gameMode);
  game.players.player1.name = changeFont('blue', player1Name) 

  let player2Name = readSecondName(game.gameMode);
  game.players.player2.name = changeFont('green', player2Name);

  game.players.player1.symbol = readFirstSymbol(game.players.player1.name);
  game.players.player2.symbol = assignSecondSymbol(game.players.player1.symbol);

  game.players.player1.inputs = [];
  game.players.player2.inputs = [];
  createLogData(player1Name, player2Name, game.gameMode);
  return game;
};

const createLogData = function(player1Name, player2Name, gameMode) {
  let logFile = "./src/.log.json";
  let logData = readFile(logFile);

  player1Name = player1Name.toUpperCase();
  player2Name = player2Name.toUpperCase();
  logData = addPlayerRecord(logData, player1Name);
  logData = addPlayerRecord(logData, player2Name);

  logData[player1Name].VSPlayer += 1;
  logData[player2Name].VSPlayer += 1;

  if(gameMode == 1) {
    logData[player1Name].VSBot += 1;
    logData[player1Name].VSPlayer -= 1;
  }

  logData[player1Name].gamesPlayed += 1;
  logData[player2Name].gamesPlayed += 1;

  writeFile(logFile, logData);
};

const retrieveBoard = function(game) {
  game.board = { data : createArray(10, " ") };
  game.board.frame = createBoard(game.board.data);
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
  let logFile = "./src/.log.json";
  let logData = readFile(logFile);

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
      name = removeColor(name).toUpperCase();
      logData[name].gamesWon += 1;
    }

    if(currentMove == 9) {
      declareDraw(game.board.frame, game.banner);
      name = removeColor(name).toUpperCase();
      logData[name].gamesDraw += 1;
    }
    game.turn = switchPlayer();
  }

  writeFile(logFile, logData)
};

const removeColor = function(string) {
  return string.slice(5, string.length-4);
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

module.exports = { initiateGame };
