import { openModal } from '../modal-plugin.js';
import { ModalEnum, isValidFileType } from '../utils';
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
  const photoPreviewElement = document.querySelector('.img-upload__preview img');
  const effectPreviewElements = document.querySelectorAll('.effects__preview');

  uploadPhotoTriggerElement.addEventListener('change', (evt) => {
    evt.preventDefault();

    const file = evt.target.files[0];

    if (file && isValidFileType(file)) {
      photoPreviewElement.src = URL.createObjectURL(file);
      effectPreviewElements.forEach((preview) =>
        (preview.style.backgroundImage = `url('${photoPreviewElement.src}')`));
    }

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
