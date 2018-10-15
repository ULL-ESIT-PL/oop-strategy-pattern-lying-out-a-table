let json = process.argv.slice(2).pop() || "input.json";
debugger;
let input = require(json);
let TCell = require("TCell");
let RCell = require("RCell");
let UnderlinedCell = require("UnderlinedCell");
let StrechCell = require("StrechCell");

let DTable = require("DTable");

let table = new DTable();
console.log(table.drawAllTable(input));
