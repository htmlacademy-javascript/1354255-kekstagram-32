import { generatePhotos } from './create-data.js';
import { createPictureComponent } from './utils.js';

const photosContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const photos = generatePhotos();

photos.forEach((photo) => picturesFragment.append(createPictureComponent(photo, pictureTemplate)));

photosContainerElement.append(picturesFragment);
