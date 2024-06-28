import { describe, it, expect } from 'vitest';
import { checkStringLength, isPalindrome, extractNumbers } from './string-functions.js';

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
    value: 'топот',
    expectedResult: true
  },
  {
    value: 'ДовОд',
    expectedResult: true
  },
  {
    value: 'Кекс',
    expectedResult: false
  },
  {
    value: 'Лёша на полке клопа нашёл ',
    expectedResult: true
  },
];

const extractNumbersCases = [
  {
    value: '2023 год',
    expectedResult: 2023
  },
  {
    value: 'ECMAScript 2022',
    expectedResult: 2022
  },
  {
    value: '1 кефир, 0.5 батона',
    expectedResult: 105
  },
  {
    value: 'агент 007',
    expectedResult: 7
  },
  {
    value: 2023,
    expectedResult: 2023
  },
  {
    value: -1,
    expectedResult: 1
  },
  {
    value: 1.5,
    expectedResult: 15
  },
  {
    value: 'а я томат',
    expectedResult: NaN
  },
];

describe('checkStringLength', () => {
  it.each(checkStringLengthCases)('returns $expectedResult for $values', ({ values, expectedResult }) => {
    expect(checkStringLength(...values)).toBe(expectedResult);
  });
});

describe('isPalindrome', () => {
  it.each(isPalindromeCases)('returns $expectedResult for $value', ({ value, expectedResult }) => {
    expect(isPalindrome(value)).toBe(expectedResult);
  });
});

describe('extractNumbers', () => {
  it.each(extractNumbersCases)('returns $expectedResult for $value', ({ value, expectedResult }) => {
    expect(extractNumbers(value)).toBe(expectedResult);
  });
});
