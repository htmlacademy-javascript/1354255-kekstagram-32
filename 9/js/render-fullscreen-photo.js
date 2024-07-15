import { CommentsNumber, EmptyCommentsBlock, HIDDEN_BLOCK_CLASS } from './constants.js';
import { createCommentComponent, renderList } from './utils.js';

const picturePreview = document.querySelector('.big-picture__preview');
const commentsContainerElement = picturePreview.querySelector('.social__comments');
const commentCountElement = picturePreview.querySelector('.social__comment-count');
const commentsLoaderElement = picturePreview.querySelector('.comments-loader');

const renderComments = (comments, commentsContainer) => renderList(comments, commentsContainer)(createCommentComponent);

const renderCommentsInRange = (comments, startValue, endValue) => {
  const endOfRange = endValue > comments.length ? comments.length : endValue;

  commentCountElement.querySelector('.social__comment-shown-count').textContent = endOfRange;
  renderComments(comments.slice(startValue, endOfRange), commentsContainerElement);
};

const showPicture = (url, description) => {
  const pictureElement = picturePreview.querySelector('.big-picture__img > img');

  pictureElement.src = url;
  pictureElement.alt = description;
};

const showLikes = (likesCount) => {
  picturePreview.querySelector('.likes-count').textContent = likesCount;
};

const showDescription = (description) => {
  picturePreview.querySelector('.social__caption').textContent = description;
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

  const loadMoreComments = () => {
    renderCommentsInRange(comments, commentsToShow, commentsToShow + CommentsNumber.AMOUNT_TO_LOAD);
    commentsToShow += CommentsNumber.AMOUNT_TO_LOAD;

    if (commentsToShow >= comments.length) {
      hideCommentsLoader();
      commentsLoaderElement.removeEventListener('click', loadMoreComments);
    }
  };

  commentsLoaderElement.addEventListener('click', loadMoreComments);
};

export const renderPhotoInfo = (photo) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  showPicture(url, description);
  showLikes(likes);
  showDescription(description);
  showComments(comments);
};
