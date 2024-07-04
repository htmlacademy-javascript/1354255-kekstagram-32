import { createPictureComponent, renderList } from './utils.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const renderPhotos = (photos, photosContainer) =>
  renderList(photos, photosContainer)(createPictureComponent, pictureTemplate);
