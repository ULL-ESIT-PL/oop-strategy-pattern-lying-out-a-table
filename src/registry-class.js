let inspect = require("util").inspect;
let mapClass = new Map();

let addMapClass = (key, clss) => mapClass[key] = clss;

let findClass = (value) => {
  let className = value.constructor.name;
  let currClass = mapClass[className];
  if (className === 'Object') currClass = mapClass[value.type];

  let params;
  if ((className === 'Number') || (className === 'String'))
      params = [ String(value) ];
  else if (className === 'Object') {	 
    if (value.type && value.params) {
      let {className, currClass} = findClass(value.params[0]);
      params = [new currClass(value.params[0]), ...value.params.slice(1)];
    } 
    else  throw "Error at: "+inspect(value)+"  'type'  and 'params' attributes are required"
  } 
  return {className, currClass, params};
};

module.exports = { addMapClass, findClass };
