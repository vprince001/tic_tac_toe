const headerLib = require('./src/headerLib.js');
const {selectHeader} = headerLib;

const library = require('./src/library.js')
const {createBoard} = library;
const {readGameModeInput} = library;

const main = function() {
  let header = selectHeader();
  console.log(header);

  let data = {};
  data.boardData = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '];
  data.board = createBoard(data.boardData);

  data.modeNumber = readGameModeInput();
  console.log(data.modeNumber);
}

main();
