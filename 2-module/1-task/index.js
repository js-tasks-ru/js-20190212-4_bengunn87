/**
 * Клонируем объект
 * @param {Object} obj - клонируем объект
 * @returns {Object}
 */
function clone(obj) {
  let tmpObj = {};
  for (let key in obj) {
	if ((obj[key] !== null) && 
	    (toString.call(obj[key]) === '[object Object]')) {
      tmpObj[key] = clone(obj[key]);	
	} else if (toString.call(obj[key]) === '[object Array]'){
	  tmpObj[key] = obj[key].slice();
    } else {
	  tmpObj[key] = obj[key];		
	};
  };
  return tmpObj;
};
