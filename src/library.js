const color = function(selectedColor,text) {
  let colors = {};
  colors.red    = "\033[31m";
  colors.green  = "\033[32m";
  colors.yellow = "\033[33m";
  colors.blue   = "\033[34m";
  colors.violet = "\033[35m";
  colors.cyan   = "\033[36m";
  colors.white  = "\033[37m";

  return colors[selectedColor] + text + colors.white;
};

const createBoard = function (boardData){
  let blankLine = "                                         ";
  let a = color("violet", "| ");
  let b = color("violet", " | ");
  let c = color("violet", " |");

  let firstLine =  blankLine+ a +boardData[1]+ b +boardData[2]+ b +boardData[3]+ c +"\n";
  let secondLine = blankLine+ a +boardData[4]+ b +boardData[5]+ b +boardData[6]+ c +"\n";
  let thirdLine  = blankLine+ a +boardData[7]+ b +boardData[8]+ b +boardData[9]+ c +"\n";
  let border = blankLine + color("violet", "+---+---+---+") + "\n";

  let board = border + firstLine + border + secondLine + border + thirdLine + border;
  return board;
};

exports.createBoard = createBoard;
