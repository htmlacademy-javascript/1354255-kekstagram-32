import { testCases } from './utils.js';

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const stringWithoutSpaces = string.replaceAll(/\s/g, '').toLowerCase();
  const stringReversed = stringWithoutSpaces.split('').reverse().join('');

  return stringWithoutSpaces === stringReversed;
};

const extractNumbers = (stringOrNumber) =>
  parseInt(stringOrNumber.toString().replaceAll(/[^\d]/g, ''), 10);

// tests
const checkStringLengthCases = [
  {
    values: ['проверяемая строка', 20],
    expectedResult: true
  },
  {
    values: ['проверяемая строка', 18],
    expectedResult: true
  },
  {
    values: ['проверяемая строка', 10],
    expectedResult: false
  },
];

const isPalindromeCases = [
  {
    values: 'топот',
    expectedResult: true
  },
  {
    values: 'ДовОд',
    expectedResult: true
  },
  {
    values: 'Кекс',
    expectedResult: false
  },
  {
    values: 'Лёша на полке клопа нашёл ',
    expectedResult: true
  },
];

const extractNumbersCases = [
  {
    values: '2023 год',
    expectedResult: 2023
  },
  {
    values: 'ECMAScript 2022',
    expectedResult: 2022
  },
  {
    values: '1 кефир, 0.5 батона',
    expectedResult: 105
  },
  {
    values: 'агент 007',
    expectedResult: 7
  },
  {
    values: 2023,
    expectedResult: 2023
  },
  {
    values: -1,
    expectedResult: 1
  },
  {
    values: 1.5,
    expectedResult: 15
  },
  {
    values: 'а я томат',
    expectedResult: NaN
  },
];

testCases({ cb: checkStringLength, cases: checkStringLengthCases });
testCases({ cb: isPalindrome, cases: isPalindromeCases });
testCases({ cb: extractNumbers, cases: extractNumbersCases });
