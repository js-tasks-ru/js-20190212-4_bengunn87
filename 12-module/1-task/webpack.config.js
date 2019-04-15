const path = require('path');
module.exports = {
    /**
     * Здесь должен быть описан ваш конфиг для сборки.
     * Для ссылки на текущую папку используйте встроенную переменную __dirname
     */
    entry: './modules/app',

    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '')
    }
};
