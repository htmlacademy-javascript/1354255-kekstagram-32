import {
  AvatarsNumber,
  COMMENT_MESSAGES,
  CommentsNumber,
  LikesNumber,
  PHOTO_DESCRIPTIONS,
  PhotosNumber,
  USER_NAMES,
} from './constants.js';
import { createRandomIdFromRangeGenerator, getRandomInteger } from './utils.js';

const generateCommentId = createRandomIdFromRangeGenerator(CommentsNumber.START_ID, CommentsNumber.MAX * PhotosNumber.MAX);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
  message: COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)],
  name: getRandomInteger(0, USER_NAMES.length - 1),
});

const generatePhotoId = createRandomIdFromRangeGenerator(PhotosNumber.MIN, PhotosNumber.MAX);

const createPhoto = () => {
  const id = generatePhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id - 1] ?? '',
    likes: getRandomInteger(LikesNumber.MIN, LikesNumber.MAX),
    comments: Array.from({ length: getRandomInteger(CommentsNumber.MIN, CommentsNumber.MAX) }, createComment),
  };
};

export const generatePhotos = () => Array.from({ length: PhotosNumber.MAX }, createPhoto);
