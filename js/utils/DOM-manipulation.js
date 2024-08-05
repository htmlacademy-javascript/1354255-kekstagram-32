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

export const renderList = (elements, containerElement) => (createComponent, template = '') => {
  const fragment = document.createDocumentFragment();

  elements.forEach((element) => fragment.append(createComponent(element, template)));

  containerElement.append(fragment);
};

export const lockBodyScroll = () => document.body.classList.add('modal-open');

export const unlockBodyScroll = () => document.body.classList.remove('modal-open');
