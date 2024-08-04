import { showErrorMessage } from '../message-modal/error-message.js';
import { showSuccessMessage } from '../message-modal/success-message.js';
import { closeModalHandler } from '../modal-plugin.js';
import {
  EndpointEnum,
  loadData,
  MethodEnum,
} from '../utils';
import {
  getCommentErrorMessage,
  getHashtagErrorMessage,
  validateCommentField,
  validateHashtagField
} from './form-validation-rules.js';

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const uploadPhotoFormElement = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');

const initValidation = (uploadElement, hashtagElement, commentElement) => {
  const pristine = new Pristine(uploadElement, pristineConfig, false);

  pristine.addValidator(hashtagElement, validateHashtagField, getHashtagErrorMessage);
  pristine.addValidator(commentElement, validateCommentField, getCommentErrorMessage);

  return pristine;
};

export const resetUploadForm = () => {
  uploadPhotoFormElement.reset();
};

const submitHandler = async (evt) => {
  evt.preventDefault();

  const pristine = initValidation(uploadPhotoFormElement, hashtagFieldElement, commentFieldElement);

  if (pristine.validate()) {
    submitButtonElement.disabled = true;

    const data = new FormData(uploadPhotoFormElement);

    try {
      await loadData(EndpointEnum.SEND_DATA, MethodEnum.POST, data);

      resetUploadForm();
      closeModalHandler();
      showSuccessMessage();
    } catch {
      showErrorMessage();
    } finally {
      submitButtonElement.disabled = false;
      pristine.destroy();
    }
  }
};

export const resetUploadPhotoForm = () => uploadPhotoFormElement.removeEventListener('submit', submitHandler);

export const initUploadPhotoForm = () => uploadPhotoFormElement.addEventListener('submit', submitHandler);
