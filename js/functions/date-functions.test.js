import { describe, it, expect } from 'vitest';
import { checkMeetingFitsSchedule, checkMeetingFitsWorkday } from './date-functions.js';

const checkMeetingFitsCases = [
  {
    values: ['08:00', '17:30', '14:00', 90],
    expectedResult: true
  },
  {
    values: ['8:0', '10:0', '8:0', 120],
    expectedResult: true
  },
  {
    values: ['08:00', '14:30', '14:00', 90],
    expectedResult: false
  },
  {
    values: ['14:00', '17:30', '08:0', 90],
    expectedResult: false
  },
  {
    values: ['8:00', '17:30', '08:00', 900],
    expectedResult: false
  },
  {
    values: ['8:00', '17:30', '07:30', 30],
    expectedResult: false
  },
  {
    values: ['8:00', '17:30', '17:30', 30],
    expectedResult: false
  },
];

describe('checkMeetingFitsSchedule', () => {
  it.each(checkMeetingFitsCases)('returns $expectedResult for $values', ({ values, expectedResult }) => {
    expect(checkMeetingFitsSchedule(...values)).toBe(expectedResult);
  });
});

describe('checkMeetingFitsWorkday', () => {
  it.each(checkMeetingFitsCases)('returns $expectedResult for $values', ({ values, expectedResult }) => {
    expect(checkMeetingFitsWorkday(...values)).toBe(expectedResult);
  });
});
