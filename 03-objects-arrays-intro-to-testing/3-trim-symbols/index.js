/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
 if(size === 0) {
   return '';
 } else if (!size) {
   return string;
 }
  const chars = string.split('');
  let count = 1;
  let res = chars[0] || '';
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1]) {
      count += 1;
    } else {
      count = 1;
    }
    if (count <= size) {
      res += chars[i];
    }
  }
  return res;
}
