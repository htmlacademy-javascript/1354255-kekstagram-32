import { HIDDEN_BLOCK_CLASS, ModalEnum } from './constants';
import {
  isEscapeKey,
  isTargetInputField,
  lockBodyScroll,
  unlockBodyScroll
} from './utils.js';

let openedModal = null;

const modalParams = Object.values(ModalEnum).reduce((paramsList, modalName) => {
  paramsList[modalName] = {
    closeButtonElement: null,
    modalElement: null
  };

  return paramsList;
}, {});

const assignOpenedModalParams = ({ modalName, modalElement, closeButtonElement, beforeCloseCallback }) => {
  openedModal = modalName;
  modalParams[modalName].modalElement = modalElement;
  modalParams[modalName].closeButtonElement = closeButtonElement;

  if (beforeCloseCallback) {
    modalParams[modalName].beforeCloseGuard = beforeCloseCallback;
  }
};

const resetOpenedModalParams = () => {
  if (modalParams[openedModal].beforeCloseGuard) {
    modalParams[openedModal].beforeCloseGuard = null;
  }

  modalParams[openedModal].modalElement = null;
  modalParams[openedModal].closeButtonElement = null;
  openedModal = null;
};

function documentKeydownHandler (evt) {
  if(!isEscapeKey(evt)) {
    return;
  }

  if (isTargetInputField(evt.target)) {
    return;
  }

  evt.preventDefault();
  closeModalHandler();
}

function closeModalHandler () {
  if (modalParams[openedModal].beforeCloseGuard) {
    modalParams[openedModal].beforeCloseGuard();
  }

  modalParams[openedModal].modalElement.classList.add(HIDDEN_BLOCK_CLASS);
  unlockBodyScroll();

  modalParams[openedModal].closeButtonElement.removeEventListener('click', closeModalHandler);
  document.removeEventListener('keydown', documentKeydownHandler);

  resetOpenedModalParams();
}

export const openModal = (modalName, { modalElement, closeButtonElement, beforeCloseCallback }) => {
  assignOpenedModalParams({ modalName, modalElement, closeButtonElement, beforeCloseCallback });

  modalElement.classList.remove(HIDDEN_BLOCK_CLASS);
  lockBodyScroll();

  closeButtonElement.addEventListener('click', closeModalHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};
