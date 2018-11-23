const {selectHeader} = require('./src/headerLib.js');

const {createBoardData, createBoard, readGameModeInput,
       readPlayerName, readFirstSymbol, assignSymbols,
       createInputArrays, startGame, updateScreen} = require('./src/library.js');

const main = function() {
  let header = selectHeader();
  console.log(header);

  let game = {};
  game.boardData = createBoardData();
  game.board = createBoard(game.boardData);

  game.modeNumber = readGameModeInput();

  game.names = readPlayerName(game.modeNumber);

  let firstSymbol = readFirstSymbol(game.names.firstName);
  game.symbols = assignSymbols(firstSymbol);

  game.inputs = createInputArrays(game.names);
  updateScreen(header, game.board);

  startGame(game, header);
};

main();
