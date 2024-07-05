import { CommentsNumber } from './constants.js';
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
const renderCommentsInRange = (comments, startValue, endValue) => {
  const endOfRange = endValue > comments.length ? comments.length : endValue;

  commentsShownCountElement.textContent = endOfRange;
  renderComments(comments.slice(startValue, endOfRange), commentsContainerElement);
};

export const renderPhotoInfo = (photo) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  pictureElement.src = url;
  pictureElement.alt = description;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  if (!comments.length) {
    commentsContainerElement.textContent = 'Пока нет комментариев. Оставьте первый';
    commentsContainerElement.style.padding = '20px 15px 15px';
    commentCountElement.classList.add('hidden');
    commentsLoaderElement.classList.add('hidden');

    return;
  }

  let commentsToShow = comments.length < CommentsNumber.AMOUNT_TO_LOAD ? comments.length : CommentsNumber.AMOUNT_TO_LOAD;

  commentsTotalCountElement.textContent = comments.length;
  commentsContainerElement.innerHTML = '';
  renderCommentsInRange(comments, 0, commentsToShow);

  if (commentsToShow >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    return;
  }

  const loadMoreComments = () => {
    renderCommentsInRange(comments, commentsToShow, commentsToShow + CommentsNumber.AMOUNT_TO_LOAD);
    commentsToShow += CommentsNumber.AMOUNT_TO_LOAD;

    if (commentsToShow >= comments.length) {
      commentsLoaderElement.classList.add('hidden');
      commentsLoaderElement.removeEventListener('click', loadMoreComments);
    }
  };

  commentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.addEventListener('click', loadMoreComments);
};
