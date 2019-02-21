/**
 * Клонируем объект
 * @param {Object} obj - объект в котором ищем
 * @param {*} value - значение, которе ищем
 * @returns {Object}
 */
 function find1(obj, value) {
  let tmpArr = [];
  for (let key in obj) {
    if ((obj[key] !== null) && 
        (toString.call(obj[key]) === '[object Object]')) {
        const dopArr = find1(obj[key], value);
      dopArr.forEach(function (item, i, arr){
      arr[i] = key + '.'+ item;
      });
    
      tmpArr = tmpArr.concat(dopArr); 
    } else if (obj[key] === value) {
      tmpArr.push(key);   
    };
  };
  return tmpArr;
};

function find(obj, value){
  let tmpArr = find1(obj, value);
  if (tmpArr.length == 0) return null;
  if (tmpArr.length == 1) return tmpArr[0];
  return tmpArr;
};
