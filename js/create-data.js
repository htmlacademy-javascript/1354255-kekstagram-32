import {
  MIN_COMMENT_ID,
  COMMENTS_NUMBER,
  PHOTOS_NUMBER,
  MIN_AVATAR_ID,
  MAX_AVATAR_ID,
  COMMENT_MESSAGES,
  USER_NAMES,
  MIN_PHOTO_ID,
  PHOTO_DESCRIPTIONS,
  MIN_LIKES_NUMBER,
  MAX_LIKES_NUMBER
} from './constants.js';
import { getRandomInteger, createRandomIdFromRangeGenerator } from './utils.js';

const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, COMMENTS_NUMBER * PHOTOS_NUMBER);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomInteger(0, COMMENT_MESSAGES.length - 1),
  name: getRandomInteger(0, USER_NAMES.length - 1),
});

const generatePhotoId = createRandomIdFromRangeGenerator(MIN_PHOTO_ID, PHOTOS_NUMBER);

const createPhoto = () => {
  const id = generatePhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id - 1] ?? '',
    likes: getRandomInteger(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
    comments: Array.from({ length: getRandomInteger(0, COMMENTS_NUMBER) }, createComment),
  };
};

export const createPhotos = () => Array.from({ length: PHOTOS_NUMBER }, createPhoto);
