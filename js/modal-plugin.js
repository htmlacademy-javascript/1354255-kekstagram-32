import { HIDDEN_BLOCK_CLASS, ModalEnum } from './constants.js';
import {
  isEscapeKey,
  isTargetInputField,
  lockBodyScroll,
  unlockBodyScroll
} from './utils.js';

let openedModal = null;

const modalParams = Object.values(ModalEnum).reduce((paramsList, modalName) => {
  paramsList[modalName] = {
    closeButton: null,
    modalElement: null
  };

  return paramsList;
}, {});

const assignOpenedModalParams = ({ modalName, modalElement, closeButton, beforeCloseCb }) => {
  openedModal = modalName;
  modalParams[modalName].modalElement = modalElement;
  modalParams[modalName].closeButton = closeButton;

  if (beforeCloseCb) {
    modalParams[modalName].onBeforeClose = beforeCloseCb;
  }
};

const resetOpenedModalParams = () => {
  if (modalParams[openedModal].onBeforeClose) {
    modalParams[openedModal].onBeforeClose = null;
  }

  modalParams[openedModal].modalElement = null;
  modalParams[openedModal].closeButton = null;
  openedModal = null;
};

function onDocumentKeydown (e) {
  if(!isEscapeKey(e)) {
    return;
  }

  if (isTargetInputField(e.target)) {
    return;
  }

  e.preventDefault();
  closeModal();
}

function closeModal () {
  if (modalParams[openedModal].onBeforeClose) {
    modalParams[openedModal].onBeforeClose();
  }

  modalParams[openedModal].modalElement.classList.add(HIDDEN_BLOCK_CLASS);
  unlockBodyScroll();

  modalParams[openedModal].closeButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);

  resetOpenedModalParams();
}

export const openModal = (modalName, { modalElement, closeButton, beforeCloseCb }) => {
  assignOpenedModalParams({ modalName, modalElement, closeButton, beforeCloseCb });

  modalElement.classList.remove(HIDDEN_BLOCK_CLASS);
  lockBodyScroll();

  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};
