export const isObjectEmpty = (object: object) =>
  !!(!object || Object.keys(object).length === 0);

export function selectArrayOnIndices<T>(arr: Array<T>, indices: number[]) {
  // here we filter the array to retain only those array elements
  // are present in the supplied 'indices' array:
  return arr.filter((_element, index) => {
    // if the index of the current element is present in the
    // array of indices the index will be zero or greater,
    // so those elements will be retained (as the assessment
    // will be true/truthy:
    return indices.indexOf(index) !== -1;
  });
}
