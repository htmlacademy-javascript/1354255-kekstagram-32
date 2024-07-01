export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

export const createPictureComponent = (photo, template) => {
  const { url = '', description = '', likes = 0, comments = [] } = photo;

  const pictureElement = template.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  const commentsElement = pictureElement.querySelector('.picture__comments');
  const likesElement = pictureElement.querySelector('.picture__likes');

  imageElement.src = url;
  imageElement.alt = description;
  commentsElement.textContent = comments.length;
  likesElement.textContent = likes;

  return pictureElement;
};
