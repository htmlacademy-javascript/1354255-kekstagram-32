import { generatePhotos } from './create-data.js';

const photosContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

export const createPictureComponent = ({
  url = '',
  description = '',
  likes = 0,
  comments = [],
}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  const commentsElement = pictureElement.querySelector('.picture__comments');
  const likesElement = pictureElement.querySelector('.picture__likes');

  imageElement.src = url;
  imageElement.alt = description;
  commentsElement.textContent = comments.length;
  likesElement.textContent = likes;

  return pictureElement;
};

const photos = generatePhotos();
const pictureElements = photos.map(({ url, description, likes, comments }) =>
  createPictureComponent({ url, description, likes, comments }));

photosContainerElement.append(...pictureElements);
