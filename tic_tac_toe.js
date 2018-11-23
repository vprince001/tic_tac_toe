const {selectHeader} = require('./src/headerLib.js');

const {createBoardData, createBoard, readGameModeInput,
       readPlayerName, readFirstSymbol, assignSymbols,
       createInputArrays, startGame, updateScreen} = require('./src/library.js');

const main = function() {
  let game = {};
  game.header = selectHeader();
  console.log(game.header);

  game.boardData = createBoardData();
  game.board = createBoard(game.boardData);

  game.modeNumber = readGameModeInput();

  game.names = readPlayerName(game.modeNumber);

  let firstSymbol = readFirstSymbol(game.names.firstName);
  game.symbols = assignSymbols(firstSymbol);

  game.inputs = createInputArrays(game.names);
  updateScreen(game.header, game.board);

  startGame(game, game.header);
};

main();
