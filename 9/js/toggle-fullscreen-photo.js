import { ModalEnum } from './constants.js';
import { openModal } from './modal-plugin.js';
import { renderPhotoInfo } from './render-fullscreen-photo.js';
import { getPhotoById } from './utils.js';

export const toggleFullscreenPhoto = (photos, photosContainerElement) => {
  const pictureModalElement = document.querySelector('.big-picture');
  const closeButton = document.querySelector('.big-picture__cancel');

  photosContainerElement.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');

    if (!picture) {
      return;
    }

    const photo = getPhotoById(picture.dataset.id, photos);
    renderPhotoInfo(photo);
    openModal(ModalEnum.FULLSCREEN_PHOTO, { modalElement: pictureModalElement, closeButton });
  });
};