/* eslint no-console: 0 */

const RESET_CSS_ATTRIBUTE = '\x1B[m';

const getConsoleGroupMessage = (groupName) => [
  `%c ${groupName}${RESET_CSS_ATTRIBUTE} tests`,
  'color: cornflowerblue;',
];

const testResult = (returnedValue, expectedValue) => {
  const SUCCESS_COLOR = 'color: #bada55';
  const ERROR_COLOR = 'color: #dc143c';

  const isEqual =
    returnedValue === expectedValue ||
    (Number.isNaN(returnedValue) && Number.isNaN(expectedValue));

  const testMessage = `%cTest ${
    isEqual ? 'passed' : 'failed'
  }${RESET_CSS_ATTRIBUTE}`;
  const textColor = isEqual ? SUCCESS_COLOR : ERROR_COLOR;

  console.log(
    `${testMessage}\nExpecting - %c${expectedValue}${RESET_CSS_ATTRIBUTE}, getting - %c${returnedValue}`,
    `background: #222; ${textColor}; padding: 3px;`,
    SUCCESS_COLOR,
    textColor
  );
};

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
