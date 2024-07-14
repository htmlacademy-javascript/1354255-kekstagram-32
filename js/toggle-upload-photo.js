import { HIDDEN_BLOCK_CLASS } from './constants.js';
import { isEscapeKey, lockBodyScroll, unlockBodyScroll } from './utils.js';

const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');
const photoEditForm = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const resetImageInputValue = () => {
  uploadPhotoTriggerElement.value = null;
};

const openPhotoEditForm = () => {
  photoEditForm.classList.remove(HIDDEN_BLOCK_CLASS);
  lockBodyScroll();

  closeButton.addEventListener('click', closePhotoEditForm);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closePhotoEditForm () {
  resetImageInputValue();
  photoEditForm.classList.add(HIDDEN_BLOCK_CLASS);
  unlockBodyScroll();

  closeButton.removeEventListener('click', closePhotoEditForm);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (e) {
  if(!isEscapeKey(e)) {
    return;
  }

  e.preventDefault();
  closePhotoEditForm();
}

export const toggleUploadPhoto = () => {
  uploadPhotoTriggerElement.addEventListener('change', (e) => {
    e.preventDefault();

    openPhotoEditForm();
  });
};
