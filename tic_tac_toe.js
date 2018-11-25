const { retrieveGameData, startGame } = require('./src/mainLib.js');

const main = function() {
  game = retrieveGameData(); 
  startGame(game);
};

main();
