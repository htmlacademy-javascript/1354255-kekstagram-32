import { describe, it, expect, beforeAll } from 'vitest';
import { generatePhotos } from './create-data.js';

expect.extend({
  toContainUnique(received) {
    const hasUnique = received.length === new Set(received).size;

    if (hasUnique) {
      return {
        message: () => `expected [${received}] array is unique`,
        pass: true,
      };
    }


    return {
      message: () => `expected [${received}] array is not to unique`,
      pass: false,
    };
  }
});

let photos;

beforeAll(() => {
  photos = generatePhotos();
});

describe('generatePhotos', () => {
  it('creates unique ids for photos', () => {
    const photoIds = photos.map((photo) => photo.id);

    expect(photoIds).toContainUnique();
  });

  it('creates unique urls for photos', () => {
    const photoUrls = photos.map((photo) => photo.url.match(/\d+/g)[0]);

    expect(photoUrls).toContainUnique();
  });

  it('creates unique comments ids', () => {
    const commentIds = [];

    for (const photo of photos) {
      for (const comment of photo.comments) {
        commentIds.push(comment.id);
      }
    }

    expect(commentIds).toContainUnique();
  });
});
