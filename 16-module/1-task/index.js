/**
 * processGenerator
 * @param {Generator} gen - генератор
 * @returns {Promise}
 */
function processGenerator(gen, yieldValue) {
    let next = gen.next(yieldValue);

    if (!next.done) {
        return next.value.then(
            result => processGenerator(gen, result),
            err => gen.throw(err)
        );
    } else {
        return new Promise(resolve => resolve(next.value));
    }

}
