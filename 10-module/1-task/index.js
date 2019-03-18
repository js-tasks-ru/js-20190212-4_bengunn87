(function () {
    'use strict';

    /**
     * Компонент, который реализует таблицу
     * с возможностью удаления строк
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

    class ClearedTable {

        constructor(data) {
            this.el = document.createElement('table');
            this.el.className = "pure-table";
            this.data = data;
            createTableHeader(this.el);
            createTableBody(this.el, this.data);
            /**
             * Метод выполняет сортировку таблицы
             * @param {number} column - номер колонки, по которой нужно выполнить сортировку (отсчет начинается от 0)
             * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
             */
            this.sort = function (column, desc = false) {
                const sortFunc = createSortFn(column, desc);
                this.items.sort(sortFunc);
                fillSortTable(this.el, this.data);
            };
            this.el.onclick = (event) => {
                if (event.target.getAttribute('href') !== '#delete') return;
                deletRow(event.target, this);
            };
        }

        /**
         * Метод который выщывается после удалении строки
         * @param {number} id - идентификатор удаляемого пользователя
         */
        onRemoved(id) {
            console.log(`Из таблицы удален пользователь ${id}`);
        };
    };

    window.ClearedTable = ClearedTable;

    function deletRow(elemA, table) {
        const tr = elemA.parentNode.parentNode;
        const id = deletItemByTr(table.data, tr);
        table.onRemoved(id);
        tr.remove();
    };

    function deletItemByTr(data, tr) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].row === tr) {
                const id = data[i].id;
                data.splice(i, 1);
                return id;
            };
        };
    };

function createTableHeader(table) {
    table.innerHTML = `
             <thead>
                <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Salary</td>
                    <td>City</td>
                    <td></td>
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
        if (key !== 'id') {
            const td = document.createElement('td');
            td.innerText = item[key];
            tr.appendChild(td);
        }
    };
    const td = document.createElement('td');
    td.innerHTML = `<a href="#delete" data-id = "${item.id}">X</a>`;
    tr.appendChild(td);
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

})();