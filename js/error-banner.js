const MESSAGE_HIDE_MS = 5000;
const ERROR_DOM_ID = 'data-error';

const hideError = () => {
  document.querySelector(`#${ERROR_DOM_ID}`).remove();
};

export const showError = (error) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);

  const errorMessageElement = document.createElement('span');
  errorMessageElement.textContent = error;

  errorElement.id = ERROR_DOM_ID;
  errorElement.append(errorMessageElement);

  document.body.insertAdjacentElement('beforeend', errorElement);

  setTimeout(() => {
    hideError();
  }, MESSAGE_HIDE_MS);
};
