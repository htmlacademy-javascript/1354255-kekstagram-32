import { HASHTAG_REG_EXP, HashtagFieldValidation, KeyEnum, STOP_ESCAPING_MODAL_ELEMENTS } from '../constants';

export const isEscapeKey = (evt) => evt.key === KeyEnum.ESCAPE;

export const isTargetInputField = (target) => STOP_ESCAPING_MODAL_ELEMENTS.some((element) => target.classList.contains(element));

export const hasUniqueValues = (array) => array.length === new Set(array).size;

export const isHashtagValid = (hashtag) => HASHTAG_REG_EXP.test(hashtag);

export const checkForValidHashtag = (hashtags) => {
  if (!hashtags.every(isHashtagValid)) {
    return HashtagFieldValidation.NOT_VALID;
  }
};

export const checkForHashtagDuplicates = (hashtags) => {
  if (!hasUniqueValues(hashtags)) {
    return HashtagFieldValidation.DUPLICATE_HASHTAGS;
  }
};

export const checkForHashtagAmount = (hashtags) => {
  if (hashtags.length > HashtagFieldValidation.MAX_AMOUNT) {
    return HashtagFieldValidation.MAX_AMOUNT_EXCEEDED;
  }
};
