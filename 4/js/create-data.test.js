import { createPhotos } from './create-data.js';
import { testCases } from './utils.js';

const photos = createPhotos();
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
