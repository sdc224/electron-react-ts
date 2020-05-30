export const checkStringEmpty = (
  str: string | null | undefined,
  returnValue?: string
) => {
  if (!str || str.length === 0 || str === '') return returnValue;
  return str;
};

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
