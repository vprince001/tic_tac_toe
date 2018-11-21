const headerLib = require('./src/headerLib.js');
const {selectHeader} = headerLib;

const library = require('./src/library.js')
const {createBoard}        = library;
const {readGameModeInput}  = library;
const {callReadPlayerName} = library;
const {readFirstSymbol}    = library;
const {assignSymbols}      = library;
const {selectGameMode}     = library;
const {declareDraw}        = library;

const main = function() {

  let header = selectHeader();
  console.log(header);

  let data = {};
  data.boardData = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
  data.board = createBoard(data.boardData);

  data.modeNumber = readGameModeInput();

  data.names = callReadPlayerName(data.modeNumber);

  let firstSymbol = readFirstSymbol(data.names.firstName);
  data.symbols = assignSymbols(firstSymbol);

  data[data.names.firstName] = [];
  data[data.names.secondName] = [];

  data.executeSelectedMode = selectGameMode(data.modeNumber);
  data = data.executeSelectedMode(data, header);

  declareDraw(data.board, header);

};

main();
