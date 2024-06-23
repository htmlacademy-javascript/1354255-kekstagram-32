/* eslint no-console: 0 */

import { getConsoleGroupMessage, testResult } from './utils.js';

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const stringWithoutSpaces = string.replaceAll(/\s/g, '').toLowerCase();
  const stringReversed = stringWithoutSpaces.split('').reverse().join('');

  return stringWithoutSpaces === stringReversed;
};

const extractNumbers = (stringOrNumber) =>
  parseInt(stringOrNumber.toString().replaceAll(/[^\d]/g, ''), 10);

console.group(...getConsoleGroupMessage('checkStringLength'));
testResult(checkStringLength('проверяемая строка', 20), true);
testResult(checkStringLength('проверяемая строка', 18), true);
testResult(checkStringLength('проверяемая строка', 10), false);
console.groupEnd();

console.group(...getConsoleGroupMessage('isPalindrome'));
testResult(isPalindrome('топот'), true);
testResult(isPalindrome('ДовОд'), true);
testResult(isPalindrome('Кекс'), false);
testResult(isPalindrome('Лёша на полке клопа нашёл '), true);
console.groupEnd();

console.group(...getConsoleGroupMessage('extractNumbers'));
testResult(extractNumbers('2023 год'), 2023);
testResult(extractNumbers('ECMAScript 2022'), 2022);
testResult(extractNumbers('1 кефир, 0.5 батона'), 105);
testResult(extractNumbers('агент 007'), 7);
testResult(extractNumbers(2023), 2023);
testResult(extractNumbers(-1), 1);
testResult(extractNumbers(1.5), 15);
testResult(extractNumbers('а я томат'), NaN);
console.groupEnd();
