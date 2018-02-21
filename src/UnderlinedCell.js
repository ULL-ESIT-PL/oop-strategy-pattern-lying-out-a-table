let TCell = require("TCell");

class UnderlinedCell extends TCell {
  constructor(inner) {
    super(inner);
  }

  draw (width, height) {
    return this.getContent(width, height)
            .concat(["-".repeat(width)]);
  }
}

module.exports = UnderlinedCell
