/* eslint no-console: 0 */

const RESET_CSS_ATTRIBUTE = '\x1B[m';

const getConsoleGroupMessage = (groupName) => [
  `%c ${groupName}${RESET_CSS_ATTRIBUTE} tests`,
  'color: cornflowerblue;',
];

const testResult = (testValue, expectedResult) => {
  const SUCCESS_COLOR = 'color: #bada55';
  const ERROR_COLOR = 'color: #dc143c';

  const isEqual =
    testValue === expectedResult ||
    (Number.isNaN(testValue) && Number.isNaN(expectedResult));

  const testMessage = `%cTest ${
    isEqual ? 'passed' : 'failed'
  }${RESET_CSS_ATTRIBUTE}`;
  const textColor = isEqual ? SUCCESS_COLOR : ERROR_COLOR;

  console.log(
    `${testMessage}\nExpecting - %c${expectedResult}${RESET_CSS_ATTRIBUTE}, getting - %c${testValue}`,
    `background: #222; ${textColor}; padding: 3px;`,
    SUCCESS_COLOR,
    textColor
  );
};

export const testCases = ({ message, cb, cases }) => {
  console.group(...getConsoleGroupMessage(message || cb.name));
  cases.forEach(({ values, expectedResult }) => {
    testResult(cb(...values), expectedResult);
  });
  console.groupEnd();
};

export const showError = (message) => console.error(message);
