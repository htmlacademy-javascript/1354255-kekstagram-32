import {
  EffectEnum,
  EffectParams,
  HIDDEN_BLOCK_CLASS
} from '../utils';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectInputElement = document.querySelector('.effect-level__value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');

let chosenEffect = EffectEnum.DEFAULT;

const isDefault = () => chosenEffect === EffectEnum.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imagePreviewElement.style.filter = null;
    return;
  }

  const { value } = effectInputElement;
  const { cssFilterName, units } = EffectParams[chosenEffect];
  imagePreviewElement.style.filter = `${cssFilterName}(${value}${units})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove(HIDDEN_BLOCK_CLASS);
};

const hideSlider = () => {
  sliderContainerElement.classList.add(HIDDEN_BLOCK_CLASS);
};

const sliderUpdateHandler = () => {
  effectInputElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  if (sliderElement.noUiSlider) {
    return;
  }

  noUiSlider.create(sliderElement, {
    step,
    range: { min, max },
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  sliderElement.noUiSlider.on('update', sliderUpdateHandler);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    step,
    range: { min, max },
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
    return;
  }

  updateSlider(EffectParams[chosenEffect].config);
  showSlider();
};

const setEffect = (filter) => {
  chosenEffect = filter;
  setSlider();
  setImageStyle();
};

const changeEffectHandler = (evt) => {
  setEffect(evt.target.value);
};

const resetFilters = () => {
  setEffect(EffectEnum.DEFAULT);
};


export const initEffects = () => {
  createSlider(EffectParams[chosenEffect].config);
  effectsElement.addEventListener('change', changeEffectHandler);
};

export const resetEffects = () => {
  resetFilters();
  sliderElement.noUiSlider.destroy();
  effectsElement.removeEventListener('change', changeEffectHandler);
};
