import { showErrorMessage } from './error-message-modal.js';
import { closeModalHandler } from './modal-plugin.js';
import { showSuccessMessage } from './success-message-modal.js';
import {
  apiHandler,
  EndpointEnum,
  MethodEnum,
} from './utils';
import {
  getCommentErrorMessage,
  getHashtagErrorMessage,
  validateCommentField,
  validateHashtagField
} from './validation-rules.js';

const uploadPhotoFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const pristine = new Pristine(uploadPhotoFormElement, pristineConfig, false);

pristine.addValidator(hashtagFieldElement, validateHashtagField, getHashtagErrorMessage);
pristine.addValidator(commentFieldElement, validateCommentField, getCommentErrorMessage);

export const resetUploadForm = () => {
  uploadPhotoFormElement.reset();
};

export const uploadPhotoFormHandler = () => {
  uploadPhotoFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      submitButtonElement.disabled = true;

      const data = new FormData(uploadPhotoFormElement);

      try {
        await apiHandler(EndpointEnum.SEND_DATA, MethodEnum.POST, data);

        resetUploadForm();
        closeModalHandler();
        showSuccessMessage();
      } catch {
        showErrorMessage();
      } finally {
        submitButtonElement.disabled = false;
      }
    }
  });
};
