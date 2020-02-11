// sources:
// 1. http://stackoverflow.com/a/11058858
// 2. https://gist.github.com/skratchdot/e095036fad80597f1c1a
// 3. https://gist.github.com/AndrewLeedham/a7f41ac6bb678f1eb21baf523aa71fd5

/**
 * Converts an ArrayBuffer to a String.
 *
 * @param buffer - Buffer to convert.
 * @returns String.
 */
export const convertArrayBufferToString = (buffer: ArrayBuffer): string =>
  String.fromCharCode.apply(null, Array.from(new Uint16Array(buffer)));

/**
 * Converts a String to an ArrayBuffer.
 *
 * @param str - String to convert.
 * @returns ArrayBuffer.
 */
export const convertStringToArrayBuffer = (str: string): ArrayBuffer => {
  const stringLength = str.length;
  const buffer = new ArrayBuffer(stringLength * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < stringLength; i += 1) {
    bufferView[i] = str.charCodeAt(i);
  }
  return buffer;
};
