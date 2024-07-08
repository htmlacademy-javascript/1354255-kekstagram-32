import { HIDDEN_BLOCK_CLASS } from './constants.js';
import { renderPhotoInfo } from './render-fullscreen-photo.js';
import { getPhotoById, isEscapeKey } from './utils.js';

const pictureModalElement = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const openPictureModal = () => {
  pictureModalElement.classList.remove(HIDDEN_BLOCK_CLASS);
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', closePictureModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closePictureModal () {
  pictureModalElement.classList.add(HIDDEN_BLOCK_CLASS);
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closePictureModal);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (e) {
  if(!isEscapeKey(e)) {
    return;
  }

  e.preventDefault();
  closePictureModal();
}

export const toggleFullscreenPhoto = (photos, photosContainerElement) => {
  photosContainerElement.addEventListener('click', (e) => {
    const picture = e.target.closest('.picture');

    if (!picture) {
      return;
    }

    const photo = getPhotoById(picture.dataset.id, photos);
    renderPhotoInfo(photo);
    openPictureModal();
  });
};
