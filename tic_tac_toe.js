const {selectHeader} = require('./src/headerLib.js');

const main = function() {
  let header = selectHeader();
  console.log(header);
}

main();
