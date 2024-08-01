import { isEscapeKey } from './utils';

let showedMessageId = null;

const renderMessage = (messageElement) => {
  messageElement.id = showedMessageId;
  document.body.insertAdjacentElement('beforeend', messageElement);
};

function documentKeydownHandler(evt) {
  if(!isEscapeKey(evt)) {
    return;
  }

  evt.preventDefault();
  closeMessageHandler();
}

function closeMessageHandler() {
  document.removeEventListener('keydown', documentKeydownHandler);
  document.querySelector(`#${showedMessageId}`).remove();
}

export const showMessage = (messageElement, id, closeButtonElement) => {
  showedMessageId = id;
  renderMessage(messageElement);

  closeButtonElement.addEventListener('click', closeMessageHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  messageElement.addEventListener('click', (evt) => {
    if (evt.target.matches(`#${id}`)) {
      closeMessageHandler();
    }
  });
};
