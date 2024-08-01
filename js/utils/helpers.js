export const getPhotoById = (id, photos) => photos.find((photo) => photo.id === +id);

export const convertPercentToFraction = (percent) => percent / 100;
