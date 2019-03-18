'use strict';

/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {

    /**
     * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
     */
    this.el = document.createElement('table');
    this.items = items;
    createTableHeader(this.el);
    createTableBody(this.el, this.items);
    /**
     * Метод выполняет сортировку таблицы
     * @param {number} column - номер колонки, по которой нужно выполнить сортировку (отсчет начинается от 0)
     * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
     */
    this.sort = function (column, desc = false) {
        const sortFunc = createSortFn(column, desc);
        this.items.sort(sortFunc);
        fillSortTable(this.el, this.items);
    };
}

function createTableHeader(table) {
    table.innerHTML = `
             <thead>
                <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Salary</td>
                    <td>City</td>
                </tr>
            </thead>`;
}

function createTableBody(table, items) {
    const body = document.createElement('tbody');
    table.appendChild(body);
    for (let item of items) {
        item.row = addTableRow(body, item);
    };
}

function addTableRow(body, item) {
    const tr = document.createElement('tr');
    for (let key in item) {
        const td = document.createElement('td');
        td.innerText = item[key];
        tr.appendChild(td);
    };

    body.appendChild(tr);
    return tr;
}

function createSortFn(column, desc) {
    let columnsName = ['name', 'age', 'salary','city'];
    if (desc) {
        return (a, b) => {
            if (a[columnsName[column]] > b[columnsName[column]]) return -1;
            return 1;
        };
    } else {
        return (a, b) => {
            if (a[columnsName[column]] > b[columnsName[column]]) return 1;
            return -1;
        };
    };
}

function fillSortTable(table, arr) {
    const body = table.querySelector('tbody');
    for (let item of arr) {
        body.appendChild(item.row);
    };
}
