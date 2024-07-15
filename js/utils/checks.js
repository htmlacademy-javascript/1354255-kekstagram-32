import { KeyEnum, STOP_ESCAPING_MODAL_ELEMENTS } from '../constants';

export const isEscapeKey = (evt) => evt.key === KeyEnum.ESCAPE;

export const isTargetInputField = (target) => STOP_ESCAPING_MODAL_ELEMENTS.some((element) => target.classList.contains(element));

export const hasUniqueValues = (array) => array.length === new Set(array).size;
