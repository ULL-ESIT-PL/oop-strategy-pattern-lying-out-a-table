let TCell = require("TCell");
let RCell = require("RCell");
let UnderlinedCell = require("UnderlinedCell");
let StrechCell = require("StrechCell");

class DTable {
  constructor () {}

  drawAllTable(data) {
    return this.drawTable(this.dataTable(data))
  }

  drawTable(rows) {
    let heights = this.rowHeights(rows);
    let widths = this.colWidths(rows);

    function drawLine(blocks, lineNo) {
      return blocks.map(function(block) {
        return block[lineNo];
      }).join(" ");
    }

    function drawRow(row, rowNum) {
      let blocks = row.map(function(cell, colNum) {
        return cell.draw(widths[colNum], heights[rowNum]);
      });
      return blocks[0].map(function(_, lineNo) {
        return drawLine(blocks, lineNo);
      }).join("\n");
    }

    return rows.map(drawRow).join("\n");
  }

  dataTable(data) {
    let keys = Object.keys(data[0]);
    let headers = keys.map(function(name) {
      return new UnderlinedCell(name);
    });
    let body = data.map(function(row) {
      return keys.map(function(name) {
        let value = row[name];
        
	if (/^\s*[-+]?\d+([.]\d*)?([eE][-+]?\d+)?\s*$/.test(value))
          return new RCell(String(value));
        else if (typeof value === 'object'){	 
	  if (value.type == "StrechCell"){
            return new StrechCell(new TCell(value.params[0]), value.params[1], value.params[2]);
	  }else if (value.type == "TCell"){
	    return new TCell(String(value.params[0]));
	  }
	}else 
          return new TCell(String(value));

      });
    });
    return [headers].concat(body);
  }

  rowHeights(rows) {
    return rows.map(function(row) {
      return row.reduce(function(max, cell) {
        return Math.max(max, cell.minHeight());
      }, 0);
    });
  }

  colWidths(rows) {
    return rows[0].map(function(_, i) {
      return rows.reduce(function(max, row) {
        return Math.max(max, row[i].minWidth());
      }, 0);
    });
  }
}

module.exports = DTable
