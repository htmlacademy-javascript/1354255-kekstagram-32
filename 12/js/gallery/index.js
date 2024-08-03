import { showAlert } from '../show-alert.js';
import { debounce, EndpointEnum, FilterEnum, loadData } from '../utils';
import { showFilters } from './filters.js';
import { initFullscreenPhoto } from './fullscreen-photo.js';
import { renderPhotos } from './render-photos.js';
import { getSortedPhotos } from './sort-photos.js';

let currentFilter = FilterEnum.DEFAULT;

const photosContainerElement = document.querySelector('.pictures');

const filterPhotos = (pictures) => (param) => {
  currentFilter = param;
  const photos = getSortedPhotos(currentFilter, pictures);
  renderPhotos(photos, photosContainerElement);
};

const debouncedFilterPhotos = (photos) => debounce(filterPhotos(photos));

export const initGallery = async () => {

  try {
    const photos = await loadData(EndpointEnum.GET_DATA);

    renderPhotos(photos, photosContainerElement);
    initFullscreenPhoto(photos, photosContainerElement);
    showFilters(debouncedFilterPhotos(photos));
  } catch(error) {
    showAlert(error);
  }
};
