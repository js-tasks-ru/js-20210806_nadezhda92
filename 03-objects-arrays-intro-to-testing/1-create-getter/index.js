/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

  const arr = path.split('.');

  return (obj) => {
    let res = obj;
    const arr = path.split('.');

    for (let item of arr) {
      if (typeof res === 'undefined') {
        break;
      }

      const currRes = res;
      res = res[item];

      if (!currRes.hasOwnProperty(item)) {
        break;
      }
    }

    return res;
  };
}
