const STOP_ESCAPING_MODAL_ELEMENTS = ['text__hashtags', 'text__description'];

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

const HashtagFieldValidation = Object.freeze({
  MAX_AMOUNT: 5,
  NOT_VALID: 'введён невалидный хэштег',
  MAX_AMOUNT_EXCEEDED: 'превышено количество хэштегов (максимум 5)',
  DUPLICATE_HASHTAGS: 'хэштеги повторяются',
});

const KeyEnum = Object.freeze({
  ESCAPE: 'Escape'
});

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
