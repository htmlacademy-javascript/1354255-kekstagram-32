import { FilterEnum } from '../utils';

const FILTER_ACTIVE_CLASS = 'img-filters__button--active';

const filtersElement = document.querySelector('.img-filters');

let currentFilter = FilterEnum.DEFAULT;

const resetFilterStyles = () => {
  const filterButtonElements = filtersElement.querySelectorAll('.img-filters__button');
  filterButtonElements.forEach((button) => button.classList.remove(FILTER_ACTIVE_CLASS));
};

const initFilters = (cb) => {
  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.img-filters__button')) {
      return;
    }

    currentFilter = evt.target.id;
    cb(currentFilter);

    resetFilterStyles();
    evt.target.classList.add(FILTER_ACTIVE_CLASS);
  });
};

export const showFilters = (cb) => {
  filtersElement.classList.remove('img-filters--inactive');
  initFilters(cb);
};
