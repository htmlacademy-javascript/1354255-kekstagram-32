import {
  AvatarsParams,
  COMMENT_MESSAGES,
  CommentsParams,
  LikesParams,
  PHOTO_DESCRIPTIONS,
  PhotosParams,
  USER_NAMES,
} from './constants';
import { createRandomIdFromRangeGenerator, getRandomInteger } from './utils.js';

const generateCommentId = createRandomIdFromRangeGenerator(CommentsParams.START_ID, CommentsParams.MAX * PhotosParams.MAX);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarsParams.MIN, AvatarsParams.MAX)}.svg`,
  message: COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)],
  name: getRandomInteger(0, USER_NAMES.length - 1),
});

const generatePhotoId = createRandomIdFromRangeGenerator(PhotosParams.MIN, PhotosParams.MAX);

const createPhoto = () => {
  const id = generatePhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id - 1] ?? '',
    likes: getRandomInteger(LikesParams.MIN, LikesParams.MAX),
    comments: Array.from({ length: getRandomInteger(CommentsParams.MIN, CommentsParams.MAX) }, createComment),
  };
};

export const generatePhotos = () => Array.from({ length: PhotosParams.MAX }, createPhoto);
