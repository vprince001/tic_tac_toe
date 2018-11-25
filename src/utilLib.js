const color = function(selectedColor,text) {
  let colors = { 
    red    : "\033[31m",
    green  : "\033[32m",
    yellow : "\033[33m",
    blue   : "\033[34m",
    violet : "\033[35m",
    cyan   : "\033[36m",
    white  : "\033[37m"
  };
  return colors[selectedColor] + text + colors.white;
};

const repeatChar = function(character, times) {
  return new Array(times).fill(character).join("");
};

const repeatString = function(string, times) {
  return new Array(times).fill(string).join("");
};

const createBoardData = function() {
  return new Array(10).fill(" ");
};

const createBoard = function (boardData){
  let spaces = repeatChar(" ", 41);

  let firstLine  = createLine(spaces, boardData[1], boardData[2], boardData[3]);
  let secondLine = createLine(spaces, boardData[4], boardData[5], boardData[6]);
  let thirdLine  = createLine(spaces, boardData[7], boardData[8], boardData[9]);
  let border = spaces + color("violet", "+---+---+---+") + "\n";

  let board = border + firstLine + border + secondLine + border + thirdLine + border;
  return board;
};

const createLine = function(spaces, first, second, third) {
  let line = spaces;
  line    += color("violet", "| ")  + first;
  line    += color("violet", " | ") + second;
  line    += color("violet", " | ") + third;
  line    += color("violet", " |")  + "\n";

  return line;
};

module.exports = { 
  color, repeatChar, repeatString,
  createBoardData, createBoard, createLine
};
