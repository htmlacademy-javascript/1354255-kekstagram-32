import {
  COMMENT_MESSAGES,
  USER_NAMES,
  PHOTO_DESCRIPTIONS,
  CommentsNumber,
  PhotosNumber,
  LikesNumber,
  AvatarsNumber,
} from './constants.js';
import { getRandomInteger, createRandomIdFromRangeGenerator } from './utils.js';

const generateCommentId = createRandomIdFromRangeGenerator(CommentsNumber.MIN, CommentsNumber.MAX * PhotosNumber.MAX);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarsNumber.MIN, AvatarsNumber.MAX)}.svg`,
  message: getRandomInteger(0, COMMENT_MESSAGES.length - 1),
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
    comments: Array.from({ length: getRandomInteger(0, CommentsNumber.MAX) }, createComment),
  };
};

export const createPhotos = () => Array.from({ length: PhotosNumber.MAX }, createPhoto);
