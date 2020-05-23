// eslint-disable-next-line import/prefer-default-export
export const deleteDuplicateFromArray = <T extends { id: number | string }>(
  array: Array<T>
) => {
  const arrayCopy = [...array]; // Some array I got from async call

  const uniqueFromArray = Array.from(new Set(arrayCopy.map(a => a.id))).map<T>(
    id => arrayCopy.find(a => a.id === id)!
  );

  return uniqueFromArray;
};
