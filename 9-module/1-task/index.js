'use strict';

/**
 * Функция выполняет наследование
 * @param {Function} Main - класс который должен стать наследником
 * @param {Function} Parent - родительский класс
 */
function extendClass(Main, Parent) {
    // здесь ваш код наследования
    Main.prototype = Object.create(Parent.prototype);
    Main.prototype.constructor = Main;
}

