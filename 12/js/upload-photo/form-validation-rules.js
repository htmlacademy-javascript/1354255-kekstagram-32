import {
  checkForHashtagAmount,
  checkForHashtagDuplicates,
  checkForValidHashtag
} from '../utils';

const CommentFieldValidation = Object.freeze({
  MAX_LENGTH: 140,
  ERROR_TEXT: 'длина комментария больше 140 символов',
});

const hashtagValidators = [
  checkForValidHashtag,
  checkForHashtagDuplicates,
  checkForHashtagAmount,
];

let hashtagErrorMessages = [];

export const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);
  hashtagErrorMessages = [];

  hashtagValidators.reduce((errors, validator) => {
    const error = validator(hashtags);

    if (error) {
      errors.push(error);
    }

    return errors;
  }, hashtagErrorMessages);

  return !hashtagErrorMessages.length;
};

export const validateCommentField = (value) => value.length <= CommentFieldValidation.MAX_LENGTH;

export const getHashtagErrorMessage = () => hashtagErrorMessages[0] ?? '';

export const getCommentErrorMessage = () => CommentFieldValidation.ERROR_TEXT;
