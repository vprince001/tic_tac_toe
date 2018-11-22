const {selectHeader} = require('./src/headerLib.js');

const {createBoardData, createBoard, readGameModeInput,
       readPlayerName, readFirstSymbol, assignSymbols,
       createInputArrays, startGame, updateScreen} = require('./src/library.js');

const main = function() {
  let header = selectHeader();
  console.log(header);

  let data = {};
  data.boardData = createBoardData();
  data.board = createBoard(data.boardData);

  data.modeNumber = readGameModeInput();

  data.names = readPlayerName(data.modeNumber);

  let firstSymbol = readFirstSymbol(data.names.firstName);
  data.symbols = assignSymbols(firstSymbol);

  data.inputs = createInputArrays(data.names);
  updateScreen(header, data.board);

  startGame(data, header);
};

main();
