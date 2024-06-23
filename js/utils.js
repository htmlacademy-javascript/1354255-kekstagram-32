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

export {
  getConsoleGroupMessage,
  testResult,
};
