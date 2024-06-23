import { testCases, showError } from './utils.js';

const COMMENTS_NUMBER = 30;
const PHOTOS_NUMBER = 25;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Ульяна',
  'Мирослава',
  'Полина',
  'Владимир',
  'Маргарита',
  'Иван',
  'Виктория',
  'Ясмина',
  'Аделина',
  'Милана'
];

const PHOTO_DESCRIPTIONS = [
  'Красивый песчаный пляж с шезлонгами, на заднем плане пятизвездочный отель в окружении леса',
  'Деревянный знак "Идите на пляж"',
  'Каменистый пляж с водоемом и деревьями. Он демонстрирует природный ландшафт, где скалы встречаются с водой, на фоне деревьев',
  'Девушка на пляже в купальнике с фотоаппаратом. Она стоит на песке на фоне океана',
  '2 миски супа с рисом. Необычная подача - рис в виде человечков, которые лежал в миске, как в ванне',
  'Черная матовая Ламборгини с открытой дверцей',
  'Деревянная тарелка с разрезанной пополам ягодой клубники и вилкой',
  'На столе стоят 2 стеклянных кружки с клюквенным соком, рядом лежат веточки клюквы',
  'Девушка на пляже пытается поймать самолет, пролетающий над ней',
  'Выдвинутая обувница на колесиках с 3 парами обуви',
  'Песочный пляж с голубым небом и забором, который огораживает растительность',
  'Белая ауди на асфальте',
  'Нарезка из сельдерея, рыбы, моркови и зеленого перца',
  'Рыжий котик лежит на рисе в виде сашими',
  'Ноги в тапочках, которые выглядят как сапоги астронавта, лежат на ручке белого дивана. Рядом стоит тумбочка с книгой, орхидеей и включеной белой лампой',
  'Вид из окна самолета на котором виден другой самолет, внизу облака, а под облаками горы',
  'Оркестр в темной одежде стоит на сцене и что-то исполняет',
  'Красная Импала стоит в кирпичном гараже',
  'Тапочки, в которые встроены фонарики, светят в темноте и освещают тумбочку',
  'Курорта в сумерки, на переднем плане пальмы и подсвеченые домики',
  'Тарелка с салатом из курицы и долькой лайма, рядом лежит вилка',
  'Закат над морем',
  'Краб на бревне',
  'Вид с концерта, где много людей',
  'Белый джип заехал в водоем, рядом гиппопотам, который разинул пасть'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      showError(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const generateCommentId = createRandomIdFromRangeGenerator(1, COMMENTS_NUMBER * PHOTOS_NUMBER);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomInteger(0, COMMENT_MESSAGES.length - 1),
  name: getRandomInteger(0, USER_NAMES.length - 1),
});

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

const createPhoto = () => {
  const id = generatePhotoId();

  return {
    id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[id - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, COMMENTS_NUMBER) }, createComment),
  };
};

const photos = Array.from({ length: PHOTOS_NUMBER }, createPhoto);

// tests
const photoIds = photos.map((photo) => photo.id);
const photoUrls = photos.map((photo) => photo.url.match(/\d+/g)[0]);
const commentIds = [];

for (const photo of photos) {
  for (const comment of photo.comments) {
    commentIds.push(comment.id);
  }
}

const checkForDuplicates = (array) => array.length !== new Set(array).size;

testCases({
  message: 'Photo ids have duplicates',
  cb: checkForDuplicates,
  cases: [
    {
      values: [photoUrls],
      expectedResult: false
    }
  ]
});

testCases({
  message: 'Photo urls have duplicates',
  cb: checkForDuplicates,
  cases: [
    {
      values: [photoIds],
      expectedResult: false
    }
  ]
});

testCases({
  message: 'Comment ids have duplicates',
  cb: checkForDuplicates,
  cases: [
    {
      values: [commentIds],
      expectedResult: false
    }
  ]
});
