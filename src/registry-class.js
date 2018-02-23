let TCell = require("TCell");
let RCell = require("RCell");
let UnderlinedCell = require("UnderlinedCell");
let StrechCell = require("StrechCell");

let mapClass = new Map();
mapClass['String']     = TCell;
mapClass['TCell']      = TCell;
mapClass['Number']     = RCell;
mapClass['RCell']      = RCell;
mapClass['StrechCell'] = StrechCell;

let addMapClass = (key, clss) => mapClass[key] = clss;

let findClass = (value) => {
  let className = value.constructor.name;
  let currClass = mapClass[className];
  if (className === 'Object') currClass = mapClass[value.type];

  let params;
  if ((className === 'Number') || (className === 'String'))
      params = [ String(value) ];
  else if (className === 'Object') {	 
    if (value.type == "StrechCell") {
      let {className, currClass} = findClass(value.params[0]);
      params = [new currClass(value.params[0]), ...value.params.slice(1)];
    } else {
      params = value.params;
    } 
  } 
  return {className, currClass, params};
};

module.exports = { addMapClass, findClass };
