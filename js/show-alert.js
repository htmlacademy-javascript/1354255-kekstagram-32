const MESSAGE_HIDE_MS = 5000;
const ERROR_DOM_ID = 'data-error';

const hideAlert = () => {
  document.querySelector(`#${ERROR_DOM_ID}`).remove();
};

export const showAlert = (error) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

  const errorElement = errorTemplate.cloneNode(true);

  const errorMessageElement = document.createElement('span');
  errorMessageElement.textContent = error;

  errorElement.id = ERROR_DOM_ID;
  errorElement.append(errorMessageElement);

  document.body.insertAdjacentElement('beforeend', errorElement);

  setTimeout(() => {
    hideAlert();
  }, MESSAGE_HIDE_MS);
};
