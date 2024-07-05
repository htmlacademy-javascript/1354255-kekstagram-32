import { createCommentComponent, renderList } from './utils.js';

const picturePreview = document.querySelector('.big-picture__preview');
const pictureElement = picturePreview.querySelector('.big-picture__img > img');
const likesCountElement = picturePreview.querySelector('.likes-count');
const descriptionElement = picturePreview.querySelector('.social__caption');
const commentsContainerElement = picturePreview.querySelector('.social__comments');
const commentCountElement = picturePreview.querySelector('.social__comment-count');
const commentsShownCountElement = commentCountElement.querySelector('.social__comment-shown-count');
const commentsTotalCountElement = commentCountElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = picturePreview.querySelector('.comments-loader');

const renderComments = (comments, commentsContainer) => renderList(comments, commentsContainer)(createCommentComponent);

export const renderPhotoInfo = (photo) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  pictureElement.src = url;
  pictureElement.alt = description;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;
  commentsShownCountElement.textContent = comments.length;
  commentsTotalCountElement.textContent = comments.length;
  commentsContainerElement.innerHTML = '';
  renderComments(comments, commentsContainerElement);
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};
