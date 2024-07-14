import { Key } from './constants.js';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

export const createPictureComponent = (photo, template) => {
  const { id = 1, url = '', description = '', likes = 0, comments = [] } = photo;

  const pictureElement = template.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  const commentsElement = pictureElement.querySelector('.picture__comments');
  const likesElement = pictureElement.querySelector('.picture__likes');

  pictureElement.dataset.id = id;
  imageElement.src = url;
  imageElement.alt = description;
  commentsElement.textContent = comments.length;
  likesElement.textContent = likes;

  return pictureElement;
};

export const createCommentComponent = (comment) => {
  const { avatar, message, name } = comment;
  const listElement = document.createElement('li');
  listElement.classList.add('social__comment');

  const contentTemplate = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  listElement.insertAdjacentHTML('beforeend', contentTemplate);
  return listElement;
};

export const getPhotoById = (id, photos) => photos.find((photo) => photo.id === +id);

export const renderList = (list, containerElement) => (createComponent, template = '') => {
  const fragment = document.createDocumentFragment();

  list.forEach((element) => fragment.append(createComponent(element, template)));

  containerElement.append(fragment);
};

export const isEscapeKey = (e) => e.key === Key.ESCAPE;

export const lockBodyScroll = () => document.body.classList.add('modal-open');

export const unlockBodyScroll = () => document.body.classList.remove('modal-open');
