/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, order) {

  const newSortArr = arr.slice();
  
  const collator = new Intl.Collator(['ru', 'en'], {sensitivity: 'case', caseFirst: 'upper'});
  
  const res = newSortArr.sort((a, b) => collator.compare(a, b));
  if (order === 'desc') {
    res.reverse();
  }  
  return res;
}
