let should = require('should');
let assert = require('better-assert');

let TCell = require("TCell");
let RCell = require("RCell");
let UnderlinedCell = require("UnderlinedCell");
let Table = require("DTable");
let SCell = require("StrechCell")

/**********************/
/*        Cell        */
/**********************/

let valueCell = "rows 1\nrows 2\nrows 3\nrows 4";
let expectedCell = ['rows 1', 'rows 2', 'rows 3', 'rows 4'];
let widthCell = 6, heightCell = 4;

describe("Cell", function() {
  it("Creation of Cells", function() {
    let cell = new TCell(valueCell);

    assert(widthCell === cell.minWidth());
    assert(heightCell === cell.minHeight());
    assert(JSON.stringify(cell.text) == JSON.stringify(expectedCell));
  })
});

/**********************/
/*        RCell       */
/**********************/

describe("RCell", function() {
  it("Creation of RCells", function() {
    let rCell = new RCell(valueCell);

    should(rCell instanceof TCell).be.exactly(true);
    should(rCell instanceof RCell).be.exactly(true);
  })
});


/**********************/
/*     StrechCell     */
/**********************/

describe("StrechCell", function(){
    it("Creation of StrechCell", function(){
        let sc = new SCell(new TCell("abc"), 6, 4);

        should(sc instanceof TCell).be.exactly(true);
        should(sc instanceof RCell).be.exactly(false);

        assert(widthCell == sc.minWidth());
        assert(heightCell === sc.minHeight());
    })
})


/**********************/
/*   UnderlinedCell   */
/**********************/

let valueUnderlinedCell = "Title";
let expectedUnderlinedCell = ['Title', '-----' ];
let widthUnderlinedCell = 5, heightUnderlinedCell = 1;

describe("UnderlinedCell", function() {
  it("Creation of UnderlinedCells", function() {
    let underlinedCell = new UnderlinedCell(valueUnderlinedCell);

    assert(widthUnderlinedCell === underlinedCell.minWidth());
    assert(heightUnderlinedCell === underlinedCell.minHeight());
    assert(
      JSON.stringify(underlinedCell.draw(underlinedCell.minWidth(), underlinedCell.minHeight())) ==
      JSON.stringify(expectedUnderlinedCell)
    );
  })
});


/**********************/
/*        Table       */
/**********************/

let table = new Table();

function checkerboard() {
  let rows = [];
  for (let i = 0; i < 5; i++) {
     let row = [];
     for (let j = 0; j < 5; j++) {
       row.push(new TCell(((j+i)%2)? " " : "##"));
     }
     rows.push(row);
  }
  return rows;
}

let expectedCheckerboard =
`##    ##    ##
   ##    ##
##    ##    ##
   ##    ##
##    ##    ##`;

describe("Checkerboard", function() {
  it("Draw the checkerboard", function() {
    table.drawTable(checkerboard()).should.match(/^(([# ]{2}(\s|$)){5}){5}$/);
  })
});

let INPUT = [
  {name: "Kilimanjaro\nMontaña mágica", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal\nPaís lejano"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

let expected =
`name           height country
-------------- ------ -------------
Kilimanjaro      5895 Tanzania
Montaña mágica
Everest          8848 Nepal
                      País lejano
Mount Fuji       3776 Japan
Mont Blanc       4808 Italy/France
Vaalserberg       323 Netherlands
Denali           6168 United States
Popocatepetl     5465 Mexico       `;

let col1w = 14, col2w = 6, col3w = 11;
describe("DrawAllTable", function() {
  it("Draw the mountains table", function() {
    let result = table.drawAllTable(INPUT);

    result.should.match(/^(.{14}\s.{6}\s.{13}\s*){11}$/);
    result.should.match(/Montaña mágica\s{20}/);
  })
});
