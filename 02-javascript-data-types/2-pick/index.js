/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export function pick(obj, ...fields) {
    const res = {};
    fields.forEach((field) => {
        res[field] = obj[field];
    });
    return res;
}
