import { isEscapeKey } from '../utils';

let showedMessageId = null;

const renderMessage = (messageElement) => {
  messageElement.id = showedMessageId;
  document.body.insertAdjacentElement('beforeend', messageElement);
};

function documentKeydownHandler(evt) {
  if(!isEscapeKey(evt)) {
    return;
  }

  messageCloseHandler();
  evt.stopImmediatePropagation();
}

function messageCloseHandler() {
  document.removeEventListener('keydown', documentKeydownHandler, true);
  document.querySelector(`#${showedMessageId}`).remove();
}

export const showMessage = (messageElement, id, closeButtonElement) => {
  showedMessageId = id;
  renderMessage(messageElement);

  closeButtonElement.addEventListener('click', messageCloseHandler);
  document.addEventListener('keydown', documentKeydownHandler, true);
  messageElement.addEventListener('click', (evt) => {
    if (evt.target.matches(`#${id}`)) {
      messageCloseHandler();
    }
  });
};
