import {
  createCommentComponent,
  HIDDEN_BLOCK_CLASS,
  renderList
} from '../utils';

const EmptyCommentsBlockParams = Object.freeze({
  text: 'Пока нет комментариев. Оставьте первый',
  class: 'social__comments--empty'
});

export const CommentsParams = Object.freeze({
  MIN: 0,
  START_ID: 1,
  MAX: 30,
  AMOUNT_TO_LOAD: 5
});

const picturePreviewElement = document.querySelector('.big-picture__preview');
const commentsContainerElement = picturePreviewElement.querySelector('.social__comments');
const commentCountElement = picturePreviewElement.querySelector('.social__comment-count');
const commentsLoaderElement = picturePreviewElement.querySelector('.comments-loader');

let commentsToShow = 0;
let commentsList = [];

const renderComments = (comments, commentsContainer) => renderList(comments, commentsContainer)(createCommentComponent);

const renderCommentsInRange = (comments, startValue, endValue) => {
  const endOfRange = endValue > comments.length ? comments.length : endValue;

  commentCountElement.querySelector('.social__comment-shown-count').textContent = endOfRange;
  renderComments(comments.slice(startValue, endOfRange), commentsContainerElement);
};

const showPicture = (url, description) => {
  const pictureElement = picturePreviewElement.querySelector('.big-picture__img > img');

  pictureElement.src = url;
  pictureElement.alt = description;
};

const showLikes = (likesCount) => {
  picturePreviewElement.querySelector('.likes-count').textContent = likesCount;
};

const showDescription = (description) => {
  picturePreviewElement.querySelector('.social__caption').textContent = description;
};

const showCommentsTotalCount = (totalCount) => {
  commentCountElement.querySelector('.social__comment-total-count').textContent = totalCount;
};

const hideCommentsLoader = () => {
  commentsLoaderElement.classList.add(HIDDEN_BLOCK_CLASS);
};

const hideCommentsList = () => {
  commentsContainerElement.textContent = EmptyCommentsBlockParams.text;
  commentsContainerElement.classList.add(EmptyCommentsBlockParams.class);
  commentCountElement.classList.add(HIDDEN_BLOCK_CLASS);
  hideCommentsLoader();
};

const resetComments = () => {
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.classList.remove(EmptyCommentsBlockParams.class);
  commentsLoaderElement.classList.remove(HIDDEN_BLOCK_CLASS);
  commentCountElement.classList.remove(HIDDEN_BLOCK_CLASS);
};

const commentsLoaderElementClickHandler = () => {
  renderCommentsInRange(commentsList, commentsToShow, commentsToShow + CommentsParams.AMOUNT_TO_LOAD);
  commentsToShow += CommentsParams.AMOUNT_TO_LOAD;

  if (commentsToShow >= commentsList.length) {
    hideCommentsLoader();
    commentsLoaderElement.removeEventListener('click', commentsLoaderElementClickHandler);
  }
};

const showComments = () => {
  commentsToShow = commentsList.length < CommentsParams.AMOUNT_TO_LOAD ? commentsList.length : CommentsParams.AMOUNT_TO_LOAD;

  resetComments();
  showCommentsTotalCount(commentsList.length);
  renderCommentsInRange(commentsList, 0, commentsToShow);

  if (!commentsList.length) {
    hideCommentsList();
    return;
  }

  if (commentsToShow >= commentsList.length) {
    hideCommentsLoader();
    return;
  }

  commentsLoaderElement.addEventListener('click', commentsLoaderElementClickHandler);
};

export const resetFullscreenPhoto = () => {
  commentsToShow = 0;
  commentsLoaderElement.removeEventListener('click', commentsLoaderElementClickHandler);
};

export const renderFullscreenPhoto = (photo) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  commentsList = comments;

  showPicture(url, description);
  showLikes(likes);
  showDescription(description);
  showComments();
};
