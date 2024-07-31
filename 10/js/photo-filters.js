import {
  FilterNameEnum,
  FilterParams,
  HIDDEN_BLOCK_CLASS
} from './utils';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const filterInputElement = document.querySelector('.effect-level__value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const filtersElement = document.querySelector('.effects');

let chosenFilter = FilterNameEnum.DEFAULT;

const isDefault = () => chosenFilter === FilterNameEnum.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imagePreviewElement.style.filter = null;
    return;
  }

  const { value } = filterInputElement;
  const { cssFilterName, units } = FilterParams[chosenFilter];
  imagePreviewElement.style.filter = `${cssFilterName}(${value}${units})`;
};

const showSlider = () => {
  sliderContainerElement.classList.remove(HIDDEN_BLOCK_CLASS);
};

const hideSlider = () => {
  sliderContainerElement.classList.add(HIDDEN_BLOCK_CLASS);
};

const sliderUpdateHandler = () => {
  filterInputElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
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

  updateSlider(FilterParams[chosenFilter].config);
  showSlider();
};

const setFilter = (filter) => {
  chosenFilter = filter;
  setSlider();
  setImageStyle();
};

const changeFilterHandler = (evt) => {
  setFilter(evt.target.value);
};

const resetFilters = () => {
  setFilter(FilterNameEnum.DEFAULT);
};


export const initFiltersHandler = () => {
  createSlider(FilterParams[chosenFilter].config);
  filtersElement.addEventListener('change', changeFilterHandler);
};

export const resetFiltersHandler = () => {
  resetFilters();
  sliderElement.noUiSlider.destroy();
  filtersElement.removeEventListener('change', changeFilterHandler);
};
