import { CommentFieldValidation, HASHTAG_REGEXP, HashtagFieldValidation } from './constants.js';
import { hasUniqueValues } from './utils.js';

const isHashtagValid = (hashtag) => HASHTAG_REGEXP.test(hashtag);

let hashtagErrorMessage = null;

export const validateHashtagField = (value) => {
  const hashtags = value.split(/\s/).map((hashtag) => hashtag.toLowerCase()).filter(Boolean);

  if (!hashtags.every(isHashtagValid)) {
    hashtagErrorMessage = HashtagFieldValidation.NOT_VALID;
    return false;
  }

  if (!hasUniqueValues(hashtags)) {
    hashtagErrorMessage = HashtagFieldValidation.DUPLICATE_HASHTAGS;
    return false;
  }

  if (hashtags.length > HashtagFieldValidation.MAX_AMOUNT) {
    hashtagErrorMessage = HashtagFieldValidation.MAX_AMOUNT_EXCEEDED;
    return false;
  }

  return true;
};

export const getHashtagErrorMessage = () => hashtagErrorMessage;

export const validateCommentField = (value) => value.length <= CommentFieldValidation.MAX_LENGTH;

export const getCommentErrorMessage = () => CommentFieldValidation.ERROR_TEXT;
