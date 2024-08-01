import { openModal } from '../modal-plugin.js';
import { getPhotoById, ModalEnum } from '../utils';
import { renderFullscreenPhoto } from './render-fullscreen-photo.js';

export const fullscreenPhotoHandler = (photos, photosContainerElement) => {
  const pictureModalElement = document.querySelector('.big-picture');
  const closeButtonElement = document.querySelector('.big-picture__cancel');

  photosContainerElement.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');

    if (!picture) {
      return;
    }

    const photo = getPhotoById(picture.dataset.id, photos);
    renderFullscreenPhoto(photo);
    openModal(ModalEnum.FULLSCREEN_PHOTO, { modalElement: pictureModalElement, closeButtonElement });
  });
};
