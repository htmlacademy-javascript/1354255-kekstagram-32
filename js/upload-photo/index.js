import { openModal } from '../modal-plugin.js';
import { ModalEnum } from '../utils/index.js';
import { initEffectsHandler, resetEffectsHandler } from './photo-effects-handler.js';
import { initPhotoScaleHandler, resetPhotoScaleHandler } from './photo-scale-handler.js';
import { initUploadPhotoFormHandler, resetUploadForm, resetUploadPhotoFormHandler } from './upload-photo-form-handler.js';

const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');

const resetImageInputValue = () => {
  uploadPhotoTriggerElement.value = null;
};

export const uploadPhotoHandler = () => {
  const photoEditFormElement = document.querySelector('.img-upload__overlay');
  const closeButtonElement = document.querySelector('.img-upload__cancel');

  uploadPhotoTriggerElement.addEventListener('change', (evt) => {
    evt.preventDefault();

    openModal(ModalEnum.UPLOAD_PHOTO, {
      closeButtonElement,
      modalElement: photoEditFormElement,
      beforeCloseCallback: () => {
        resetImageInputValue();
        resetPhotoScaleHandler();
        resetEffectsHandler();
        resetUploadForm();
        resetUploadPhotoFormHandler();
      }
    });

    initPhotoScaleHandler();
    initEffectsHandler();
    initUploadPhotoFormHandler();
  });
};
