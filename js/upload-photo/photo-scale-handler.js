import { convertPercentToFraction } from '../utils';

const ScaleParams = {
  DEFAULT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const scaleDecreaseButtonElement = document.querySelector('.scale__control--smaller');
const scaleIncreaseButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let currentScale;

const updateInputScaleValue = (scale) => {
  scaleInputElement.value = `${scale}%`;
};

const updateImageScaleStyle = (scale) => {
  imagePreviewElement.style.transform = `scale(${convertPercentToFraction(scale)})`;
};

const setDefaultParams = () => {
  currentScale = ScaleParams.DEFAULT;
  updateInputScaleValue(ScaleParams.DEFAULT);
  updateImageScaleStyle(ScaleParams.DEFAULT);
};

const resetDisabled = (element) => {
  element.disabled = false;
};

const setDisabled = (element) => {
  element.disabled = true;
};

const decreaseButtonHandler = () => {
  if (currentScale <= ScaleParams.MIN) {
    setDisabled(scaleDecreaseButtonElement);
    return;
  }

  currentScale -= ScaleParams.STEP;

  if (currentScale < ScaleParams.MAX) {
    resetDisabled(scaleIncreaseButtonElement);
  }

  updateInputScaleValue(currentScale);
  updateImageScaleStyle(currentScale);
};

const increaseButtonHandler = () => {
  if (currentScale >= ScaleParams.MAX) {
    setDisabled(scaleIncreaseButtonElement);
    return;
  }

  currentScale += ScaleParams.STEP;

  if (currentScale > ScaleParams.MIN) {
    resetDisabled(scaleDecreaseButtonElement);
  }

  updateInputScaleValue(currentScale);
  updateImageScaleStyle(currentScale);
};

export const initPhotoScaleHandler = () => {
  setDefaultParams();

  scaleDecreaseButtonElement.addEventListener('click', decreaseButtonHandler);
  scaleIncreaseButtonElement.addEventListener('click', increaseButtonHandler);
};

export const resetPhotoScaleHandler = () => {
  setDefaultParams();

  scaleDecreaseButtonElement.removeEventListener('click', decreaseButtonHandler);
  scaleIncreaseButtonElement.removeEventListener('click', increaseButtonHandler);
};
