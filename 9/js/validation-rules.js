import { CommentFieldValidation, HASHTAG_REGEXP, HashtagFieldValidation } from './constants.js';
import { hasUniqueValues } from './utils.js';


const isHashtagValid = (hashtag) => HASHTAG_REGEXP.test(hashtag);

let hashtagError = null;

export const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);

  if (!hashtags.every(isHashtagValid)) {
    hashtagError = HashtagFieldValidation.NOT_VALID;
    return false;
  }

  if (!hasUniqueValues(hashtags)) {
    hashtagError = HashtagFieldValidation.DUPLICATE_HASHTAGS;
    return false;
  }

  if (hashtags.length > HashtagFieldValidation.MAX_AMOUNT) {
    hashtagError = HashtagFieldValidation.MAX_AMOUNT_EXCEEDED;
    return false;
  }

  return true;
};

export const getHashtagErrorMessage = () => hashtagError;

export const validateCommentField = (value) => value.length <= CommentFieldValidation.MAX_LENGTH;

export const getCommentErrorMessage = () => CommentFieldValidation.ERROR_TEXT;
