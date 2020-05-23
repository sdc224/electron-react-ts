// eslint-disable-next-line import/prefer-default-export
export const checkStringEmpty = (
  str: string | null | undefined,
  returnValue?: string
) => {
  if (!str || str.length === 0 || str === '') return returnValue;
  return str;
};
