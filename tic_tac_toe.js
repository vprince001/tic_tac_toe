const readline = require('readline-sync');

const {selectHeader} = require('./src/headerLib.js');

const {createBoardData, createBoard, readGameModeInput,
       readPlayerName, readFirstSymbol, assignSymbols,
       createInputArrays, startGame, updateScreen} = require('./src/library.js');

const main = function() {
  let game = {};
  game.header = selectHeader();
  console.log(game.header);

  game.board = { data : createBoardData() };
  game.board.frame = createBoard(game.board.data);

  game.modeNumber = readGameModeInput();

  game.names = readPlayerName(game.modeNumber);

  let firstSymbol = readFirstSymbol(game.names.firstName);
  game.symbols = assignSymbols(firstSymbol);

  game.inputs = createInputArrays(game.names);
  updateScreen(game.header, game.board.frame);

  startGame(game, game.header);
};

main();
