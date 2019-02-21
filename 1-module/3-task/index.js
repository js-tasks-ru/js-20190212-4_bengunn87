'use strict';

/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(string) {
  let tmpString;
  let arrMinMax = {min: Infinity, max:-Infinity};
  let tmpNum;
  for (let i = 0; i < string.length; i++) {
	tmpString = string.slice(i);
	tmpNum = parseFloat(tmpString);
	if (!(isNaN(tmpNum))) {
	  arrMinMax.min = Math.min(arrMinMax.min, tmpNum);
	  arrMinMax.max = Math.max(arrMinMax.max, tmpNum);
	  tmpNum = tmpNum+'';
	  i = i + tmpNum.length - 1;
	};
  };
  return arrMinMax;
};
