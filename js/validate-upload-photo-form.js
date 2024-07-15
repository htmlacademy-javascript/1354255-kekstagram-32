import {
  getCommentErrorMessage,
  getHashtagErrorMessage,
  validateCommentField,
  validateHashtagField
} from './validation-rules.js';

const uploadPhotoForm = document.querySelector('.img-upload__form');
const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const pristine = new Pristine(uploadPhotoForm, pristineConfig, false);

pristine.addValidator(hashtagFieldElement, validateHashtagField, getHashtagErrorMessage);
pristine.addValidator(commentFieldElement, validateCommentField, getCommentErrorMessage);

export const validateUploadPhotoForm = () => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      uploadPhotoForm.submit();
    }
  });
};
