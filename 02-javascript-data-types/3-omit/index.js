/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  return Object.entries(obj)
    .filter(item => !fields.includes(item[0]))
    .reduce((res, item) => {
      res[item[0]] = item[1];
      return res;
    }, {});
};
