const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECOND = 1000;

const getMinutesFromDayStart = (time) => {
  const [hours, minutes] = time.split(':').map((string) => parseInt(string, 10));
  return hours * MINUTES_IN_HOUR + minutes;
};

export const checkMeetingFitsSchedule = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  const minutesFromWorkdayStart = getMinutesFromDayStart(workdayStart);
  const minutesFromWorkdayEnd = getMinutesFromDayStart(workdayEnd);
  const minutesFromMeetingStart = getMinutesFromDayStart(meetingStart);

  if (minutesFromMeetingStart < minutesFromWorkdayStart || minutesFromMeetingStart >= minutesFromWorkdayEnd) {
    return false;
  }

  return (minutesFromMeetingStart + meetingDuration) <= minutesFromWorkdayEnd;
};

/*
* Можно еще сделать через создание даты из времени, технически это работает также,
* только возвращаются прошедшие мс с самой первой даты, а не минуты с начала дня
* в каком-то смысле это даже какое-то усложнение
*/

const getDateFromTime = (time) => {
  const dateTime = new Date();
  const [hours, minutes] = time.split(':');

  return dateTime.setHours(hours, minutes);
};

export const checkMeetingFitsWorkday = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  const workdayStartTime = getDateFromTime(workdayStart);
  const workdayEndTime = getDateFromTime(workdayEnd);
  const meetingStartTime = getDateFromTime(meetingStart);


  if (meetingStartTime < workdayStartTime || meetingStartTime >= workdayEndTime) {
    return false;
  }

  return meetingStartTime + meetingDuration * SECONDS_IN_MINUTE * MS_IN_SECOND <= workdayEndTime;
};
