let TCell = require("TCell");

class RCell extends TCell {
  constructor(text) {
    super(text);
  }

  draw(width, height) {
    let result = [];
    for (let i = 0; i < height; i++) {
      let line = this.text[i] || "";
      result.push(" ".repeat(width - line.length) + line);
    }
    return result;
  }
}

module.exports = RCell
