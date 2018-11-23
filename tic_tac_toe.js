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

  game.players = { player1 : {} };
  game.players.player2 = {};
  
  game.players = readPlayerName(game.modeNumber, game.players);

  let firstSymbol = readFirstSymbol(game.players.player1.name);
  game.players = assignSymbols(firstSymbol, game.players);

  game.inputs = createInputArrays(game.players);
  updateScreen(game.header, game.board.frame);

  startGame(game, game.header);
};

main();
