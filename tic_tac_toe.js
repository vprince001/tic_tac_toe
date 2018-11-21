const headerLib = require('./src/headerLib.js');
const {selectHeader} = headerLib;

const library = require('./src/library.js')
const {createBoard} = library;
const {readGameModeInput} = library;
const {callReadPlayerName} = library;
const {readFirstSymbol} = library;
const {assignSymbols} = library;

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
  console.log(data.symbols);
}

main();
