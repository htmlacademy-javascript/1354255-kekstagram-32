import { FilterEnum } from '../utils';

const MAX_RANDOM_PICTURES = 10;

const sortByComments = (photos) =>
  photos.toSorted((photoA, photoB) => photoB.comments.length - photoA.comments.length);

const sortRandomly = (photos) => photos.toSorted(() => Math.random() - 0.5);

export const getSortedPhotos = (currentFilter, photos = []) => {
  switch (currentFilter) {
    case FilterEnum.RANDOM:
      return sortRandomly(photos).slice(0, MAX_RANDOM_PICTURES);

    case FilterEnum.DISCUSSED:
      return sortByComments(photos);

    default:
      return [...photos];
  }
};
