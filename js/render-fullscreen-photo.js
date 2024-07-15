import { CommentsNumber, EmptyCommentsBlock, HIDDEN_BLOCK_CLASS } from './constants.js';
import { createCommentComponent, renderList } from './utils.js';

const picturePreviewElement = document.querySelector('.big-picture__preview');
const commentsContainerElement = picturePreviewElement.querySelector('.social__comments');
const commentCountElement = picturePreviewElement.querySelector('.social__comment-count');
const commentsLoaderElement = picturePreviewElement.querySelector('.comments-loader');

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
  commentsContainerElement.textContent = EmptyCommentsBlock.text;
  commentsContainerElement.classList.add(EmptyCommentsBlock.class);
  commentCountElement.classList.add(HIDDEN_BLOCK_CLASS);
  hideCommentsLoader();
};

const resetComments = () => {
  commentsContainerElement.innerHTML = '';
  commentsContainerElement.classList.remove(EmptyCommentsBlock.class);
  commentsLoaderElement.classList.remove(HIDDEN_BLOCK_CLASS);
  commentCountElement.classList.remove(HIDDEN_BLOCK_CLASS);
};

const showComments = (comments) => {
  let commentsToShow = comments.length < CommentsNumber.AMOUNT_TO_LOAD ? comments.length : CommentsNumber.AMOUNT_TO_LOAD;

  resetComments();
  showCommentsTotalCount(comments.length);
  renderCommentsInRange(comments, 0, commentsToShow);

  if (!comments.length) {
    hideCommentsList();
    return;
  }

  if (commentsToShow >= comments.length) {
    hideCommentsLoader();
    return;
  }

  const loadMoreCommentsHandler = () => {
    renderCommentsInRange(comments, commentsToShow, commentsToShow + CommentsNumber.AMOUNT_TO_LOAD);
    commentsToShow += CommentsNumber.AMOUNT_TO_LOAD;

    if (commentsToShow >= comments.length) {
      hideCommentsLoader();
      commentsLoaderElement.removeEventListener('click', loadMoreCommentsHandler);
    }
  };

  commentsLoaderElement.addEventListener('click', loadMoreCommentsHandler);
};

export const renderPhotoInfo = (photo) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  showPicture(url, description);
  showLikes(likes);
  showDescription(description);
  showComments(comments);
};
