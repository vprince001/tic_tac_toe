const headerLib = require('./src/headerLib.js');
const {selectHeader} = headerLib;

const library = require('./src/library.js')
const {createBoard}        = library;
const {readGameModeInput}  = library;
const {readPlayerName} = library;
const {readFirstSymbol}    = library;
const {assignSymbols}      = library;
const {selectGameMode}     = library;
const {updateBoard}        = library;
const {declareDraw}        = library;

const main = function() {

  let header = selectHeader();
  console.log(header);

  let data = {};
  data.boardData = new Array(10).fill(" ");
  data.board = createBoard(data.boardData);

  data.modeNumber = readGameModeInput();

  data.names = readPlayerName(data.modeNumber);
  let firstSymbol = readFirstSymbol(data.names.firstName);
  data.symbols = assignSymbols(firstSymbol);

  data[data.names.firstName] = [];
  data[data.names.secondName] = [];

  data.executeSelectedMode = selectGameMode(data.modeNumber);
  data = data.executeSelectedMode(data, header);

  updateBoard(header, data.board);
  declareDraw(data.board, header);

};

main();
