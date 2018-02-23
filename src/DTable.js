let TCell = require("TCell");
let RCell = require("RCell");
let UnderlinedCell = require("UnderlinedCell");
let StrechCell = require("StrechCell");
const { findClass } = require('registry-class');

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
        let {currClass, params} = findClass(value);
        return new currClass(...params);
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
