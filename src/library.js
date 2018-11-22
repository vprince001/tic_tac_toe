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

const repeatCharacter = function(character, times) {
  return new Array(times).fill(character).join("");
};

const createBoard = function (boardData){
  let blankLine = repeatCharacter(" ", 41);
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

const readPlayerName = function(modeNumber) {
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

const readFirstSymbol = function(firstName) {
  let msgForSymbol = "Choose your symbol either 'x' or 'o' : ";
  let msgForInvalidSymbol = "Valid symbols are 'x' or 'o'. Please choose one from these only : "
  
  let firstSymbol = readline.question("\n"+firstName+", "+msgForSymbol);
  
  while(firstSymbol != "x" && firstSymbol != "o") {
     firstSymbol = readline.question("\n"+firstName+", "+msgForInvalidSymbol);
  }
  return firstSymbol;
};

const assignSymbols = function(firstSymbol) {
  let symbols = {};
  symbols.firstSymbol = color("red",firstSymbol);
  symbols.secondSymbol = color("yellow", "x");

  if(symbols.firstSymbol == color("red", "x")) {
    symbols.secondSymbol = color("yellow", "o");
  }
  return symbols;
};

const startGame = function(data, header) {

  for(let currentMove = 1; currentMove < 10; currentMove++) {
    let currentPlayer = selectCurrentPlayer(data.names, data.symbols, currentMove);
    let name = currentPlayer.name;
    let symbol = currentPlayer.symbol;
    currentPlayer.executeMove(header, data, name, symbol);
  }
  return data;
};

const selectCurrentPlayer = function(names, symbols, currentMove) {
  let currentPlayer = {}
  currentPlayer.name = names.firstName;
  currentPlayer.symbol = symbols.firstSymbol;

  if(isEven(currentMove)) {
    currentPlayer.name = names.secondName;
    currentPlayer.symbol = symbols.secondSymbol;
  }

  currentPlayer.executeMove = executePlayerMove;
  if(currentPlayer.name == color("green", "Computer")) {
    currentPlayer.executeMove = executeBotMove;
  }
  return currentPlayer;
};

const executePlayerMove = function(header, data, name, symbol) {
  updateScreen(header, data.board);
  input = +readPlayerInput(name, symbol);
  
  while(!isBlockFree(input, data.boardData, data.symbols)) {
    console.log("Sorry, this block is already occupied. Please try again.");
    input = +readPlayerInput(name, symbol);
  }
  
  insertSymbol(data, name, symbol, input);
  let hasWon = checkWin(data.inputs[name]);
  if(hasWon) { declareWinner(name, data.board, header) };
};

const updateScreen = function(header, board) {
  console.clear();
  console.log(header);
  console.log(board);
};

const readPlayerInput = function(name, symbol) {
  let msgForInput = "Enter number between 1 to 9\n";
  let msgForInvalidInput = "Entered data is not valid. Please enter number between 1 to 9 only.\n";
  console.log("\nTurn of",color('blue',name),":",symbol);

  let input = readline.questionInt(msgForInput);
  while(input < 1 || input > 9) {
    input = readline.questionInt(msgForInvalidInput);
  }

  return input;
};

const isBlockFree = function(input, boardData, symbols) {
  let status = true;

  if(boardData[input] == symbols.firstSymbol || boardData[input] == symbols.secondSymbol) {
    status = false;
  }
  return status;
};

const createInputArrays = function(names) {
  let inputs = {};
  inputs[names.firstName] = [];
  inputs[names.secondName] = [];
  return inputs;
}

const insertSymbol = function(data, name, symbol, input) {
  data.boardData[input] = symbol;
  data.inputs[name].push(input);
  data.board = createBoard(data.boardData);
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

const declareWinner = function(name, board, header) {
  let hashLine = repeatCharacter("#", 37);
  updateScreen(header, board);
  console.log(hashLine, name, "won the game !", hashLine);
  process.exit();
};

const isEven = function(number) {
  return number%2 == 0;
};

const executeBotMove = function(header, data, name, symbol) {
  let input = +Math.ceil(Math.random()*9);

  while(!isBlockFree(input, data.boardData, data.symbols)) {
    input = +Math.ceil(Math.random()*9);
  }

  insertSymbol(data, name, symbol, input);
  let hasWon = checkWin(data.inputs[name]);
  if(hasWon) { declareWinner(name, data.board, header) };
  
  updateScreen(header, data.board);
  readline.question(name+" input is "+input+". Press enter to continue.");
};

const declareDraw = function(board, header) {
  let hashLine = color("violet", repeatCharacter("#", 42));
  let drawMsg = color("green","IT'S A DRAW");
  let msg = hashLine + drawMsg + hashLine;

  console.log(msg);
};

exports.createBoard = createBoard;
exports.readGameModeInput = readGameModeInput;
exports.readPlayerName = readPlayerName;
exports.readFirstSymbol = readFirstSymbol;
exports.assignSymbols = assignSymbols;
exports.createInputArrays = createInputArrays;
exports.startGame = startGame;
exports.updateScreen = updateScreen;
exports.declareDraw = declareDraw;
