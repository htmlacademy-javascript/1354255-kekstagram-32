import { showAlert } from '../show-alert.js';
import { apiHandler, debounce, EndpointEnum, FilterEnum } from '../utils';
import { filtersHandler } from './filters-handler.js';
import { fullscreenPhotoHandler } from './fullscreen-photo-handler.js';
import { renderPhotos } from './render-photos.js';
import { sortPhotosHandler } from './sort-photos-handler.js';

let currentFilter = FilterEnum.DEFAULT;

const photosContainerElement = document.querySelector('.pictures');

const filterPhotos = (pictures) => (param) => {
  currentFilter = param;
  const photos = sortPhotosHandler(currentFilter, pictures);
  renderPhotos(photos, photosContainerElement);
};

const debouncedFilterPhotos = (photos) => debounce(filterPhotos(photos));

export const galleryHandler = async () => {

  try {
    const photos = await apiHandler(EndpointEnum.GET_DATA);

    renderPhotos(photos, photosContainerElement);
    fullscreenPhotoHandler(photos, photosContainerElement);
    filtersHandler(debouncedFilterPhotos(photos));
  } catch(error) {
    showAlert(error);
  }
};
