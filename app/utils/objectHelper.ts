// eslint-disable-next-line import/prefer-default-export
export const isObjectEmpty = (object: object) =>
  !!(!object || Object.keys(object).length === 0);
