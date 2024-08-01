import { FilterEnum } from '../utils';

const MAX_RANDOM_PICTURES = 10;

const sortByComments = (photos) =>
  photos.sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const sortRandomly = (photos) => photos.sort(() => Math.random() - 0.5);

export const sortPhotosHandler = (currentFilter, photos = []) => {
  switch (currentFilter) {
    case FilterEnum.RANDOM:
      return sortRandomly(photos).slice(0, MAX_RANDOM_PICTURES);

    case FilterEnum.DISCUSSED:
      return sortByComments(photos);

    default:
      return photos;
  }
};
