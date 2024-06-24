export const checkStringLength = (string, maxLength) => string.length <= maxLength;

export const isPalindrome = (string) => {
  const stringWithoutSpaces = string.replaceAll(/\s/g, '').toLowerCase();
  const stringReversed = stringWithoutSpaces.split('').reverse().join('');

  return stringWithoutSpaces === stringReversed;
};

export const extractNumbers = (stringOrNumber) =>
  parseInt(stringOrNumber.toString().replaceAll(/[^\d]/g, ''), 10);
