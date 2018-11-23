const { retrieveGameData, startGame } = require('./src/library.js');

const main = function() {
  game = retrieveGameData(); 
  startGame(game);
};

main();
