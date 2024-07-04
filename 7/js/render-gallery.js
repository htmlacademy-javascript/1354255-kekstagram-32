import { generatePhotos } from './create-data.js';
import { renderPhotos } from './render-photos.js';
import { toggleFullscreenPhoto } from './toggle-fullscreen-photo.js';

export const renderGallery = () => {
  const photosContainerElement = document.querySelector('.pictures');
  const photos = generatePhotos();

  renderPhotos(photos, photosContainerElement);
  toggleFullscreenPhoto(photos, photosContainerElement);
};
