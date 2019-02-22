/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let salaryArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i]['age'] <= age) {
	salaryArr.push(data[i]['name'] + ', ' + data[i]['balance']);
	};
  };
  return salaryArr.join('\n');
}

