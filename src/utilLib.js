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

module.exports = { color, repeatChar };
