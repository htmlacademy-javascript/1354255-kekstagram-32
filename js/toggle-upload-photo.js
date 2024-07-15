import { ModalEnum } from './constants.js';
import { openModal } from './modal-plugin.js';

const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');

const resetImageInputValue = () => {
  uploadPhotoTriggerElement.value = null;
};

export const toggleUploadPhoto = () => {
  const photoEditForm = document.querySelector('.img-upload__overlay');
  const closeButton = document.querySelector('.img-upload__cancel');

  uploadPhotoTriggerElement.addEventListener('change', (evt) => {
    evt.preventDefault();

    openModal(ModalEnum.UPLOAD_PHOTO, {
      closeButton,
      modalElement: photoEditForm,
      beforeCloseCb: resetImageInputValue
    });
  });
};
