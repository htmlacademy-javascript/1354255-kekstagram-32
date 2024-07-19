export const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

export const CommentFieldValidation = Object.freeze({
  MAX_LENGTH: 140,
  ERROR_TEXT: 'длина комментария больше 140 символов',
});

export const HashtagFieldValidation = Object.freeze({
  MAX_AMOUNT: 5,
  NOT_VALID: 'введён невалидный хэштег',
  MAX_AMOUNT_EXCEEDED: 'превышено количество хэштегов (максимум 5)',
  DUPLICATE_HASHTAGS: 'хэштеги повторяются',
});
