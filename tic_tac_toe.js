const headerLib = require('./src/headerLib.js');
const {selectHeader} = headerLib;

const library = require('./src/library.js')
const {createBoard}        = library;
const {readGameModeInput}  = library;
const {readPlayerName}     = library;
const {readFirstSymbol}    = library;
const {assignSymbols}      = library;
const {createInputArrays}  = library;
const {startGame}          = library;
const {updateScreen}       = library;
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

  data.inputs = createInputArrays(data.names);

  data.board = startGame(data, header);

  updateScreen(header, data.board);
  declareDraw(data.board, header);
};

main();
