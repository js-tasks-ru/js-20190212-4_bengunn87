'use strict';

let calendar = {
    from: new Date('2018-01-01T15:09:10Z'),
    to: new Date('2018-02-01T10:09:10Z')
};

calendar[Symbol.iterator] = function () {
  let currentDate = new Date(this.from);
  const lastDate = this.to;

  return {
    next(){
	  if (currentDate <= lastDate) {		
		currentDate.setDate(currentDate.getDate() + 1);
		return {
		  done: false,
          value: getDayInStr(currentDate)
		};			
      } else {
	    return {
		  done: true	
		};			
	  };	  
	}
  };	  
};

function getDayInStr(date) {
  let strDay;
  strDay = ('0'+date.getDate()).slice(-2);
  if (date.getDay() === 0 || 
      date.getDay() === 6) strDay = '[' + strDay + ']';
  return strDay;
};



