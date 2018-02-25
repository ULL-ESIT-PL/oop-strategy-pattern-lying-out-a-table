let json = process.argv.slice(2).pop() || "input.json";
debugger;
let input = require(json);
let DTable = require("DTable");

let table = new DTable();
console.log(table.drawAllTable(input));
