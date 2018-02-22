let TCell = require("TCell");

class StrechCell extends TCell{

    constructor(inner, width, heigth){
        super(inner);
        this.inner = inner;
        this.width = width;
        this.heigth = heigth;
    }

    minWidth() {
      return Math.max(this.width, this.inner.minWidth());
    }

    minHeight() {
      return Math.max(this.heigth, this.inner.minHeight());
    }

    draw(width, heigth) {
      return this.inner.draw(width, heigth);
    }
}

module.exports = StrechCell
