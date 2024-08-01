import { showMessage } from './message-plugin.js';

const ERROR_DOM_ID = 'error-message';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const closeButtonElement = errorMessageElement.querySelector('.error__button');

export const showErrorMessage = () => showMessage(errorMessageElement, ERROR_DOM_ID, closeButtonElement);
