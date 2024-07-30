import { initPhotoScaleHandler, resetPhotoScaleHandler } from './change-photo-scale.js';
import { ModalEnum } from './constants';
import { openModal } from './modal-plugin.js';
import { initFiltersHandler, resetFiltersHandler } from './photo-filters.js';
import { validateUploadPhotoForm } from './validate-upload-photo-form.js';

const uploadPhotoTriggerElement = document.querySelector('.img-upload__input');

const resetImageInputValue = () => {
  uploadPhotoTriggerElement.value = null;
};

export const toggleUploadPhoto = () => {
  const photoEditFormElement = document.querySelector('.img-upload__overlay');
  const closeButtonElement = document.querySelector('.img-upload__cancel');

  uploadPhotoTriggerElement.addEventListener('change', (evt) => {
    evt.preventDefault();

    validateUploadPhotoForm();
    initPhotoScaleHandler();
    initFiltersHandler();

    openModal(ModalEnum.UPLOAD_PHOTO, {
      closeButtonElement,
      modalElement: photoEditFormElement,
      beforeCloseCallback: () => {
        resetImageInputValue();
        resetPhotoScaleHandler();
        resetFiltersHandler();
      }
    });
  });
};