import { showError } from './error-banner.js';
import { renderPhotos } from './render-photos.js';
import { toggleFullscreenPhoto } from './toggle-fullscreen-photo.js';
import { apiHandler, EndpointEnum } from './utils';

export const renderGallery = async () => {
  const photosContainerElement = document.querySelector('.pictures');
  try {
    const photos = await apiHandler(EndpointEnum.GET_DATA);

    renderPhotos(photos, photosContainerElement);
    toggleFullscreenPhoto(photos, photosContainerElement);
  } catch(error) {
    showError(error);
  }
};
