import { createPictureComponent, renderList } from '../utils';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const renderPhotos = (photos, photosContainerElement) => {
  photosContainerElement.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderList(photos, photosContainerElement)(createPictureComponent, pictureTemplate);
};
