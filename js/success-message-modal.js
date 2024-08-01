import { showMessage } from './message-plugin.js';

const SUCCESS_DOM_ID = 'success-message';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const closeButtonElement = successMessageElement.querySelector('.success__button');

export const showSuccessMessage = () => {
  showMessage(successMessageElement, SUCCESS_DOM_ID, closeButtonElement);
};
