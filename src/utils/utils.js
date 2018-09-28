/* eslint-disable prefer-destructuring */
import _ from 'lodash';

const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

const getNumberOfDays = (y, m) => new Date(y, m < 11 ? m + 1 : 0, 0).getDate();

const getHoursFromTimestamps = (end, start) => {
  const time = (end - start) / 3600;
  return parseFloat(time.toFixed(2), 10);
};

const getDaysOfYear = year => (isLeapYear(year) ? 366 : 365);

const isLeapYear = year => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

const getDayOfWeek = (y, m, d) => new Date(y, m, d).getDay();

const splitEventsArray = array => {
  let firstArray = [...array];
  let secondArray = [];

  for (let i = 0; i < firstArray.length; i += 1) {
    const item = firstArray[i];

    // eslint-disable-next-line no-loop-func
    const partition = _.partition(firstArray, o => {
      const j = firstArray.indexOf(o);
      return i !== j && (
        (o.date_start >= item.date_start && o.date_start <= item.date_end) ||
        (o.date_end >= item.date_start && o.date_end <= item.date_end)
      );
    });

    firstArray = partition[1];
    secondArray = _.uniq([...secondArray, ...partition[0]]);
  }

  return [firstArray, secondArray];
};

const splitLoop = gamesArr => {
  let array = [...gamesArr];

  do {
    const newSplit = splitEventsArray(array[array.length - 1]);
    array.splice(array.length - 1, 1);
    array = [...array, ...newSplit];
  } while (array[array.length - 1].length);

  array.splice(array.length - 1, 1);

  return array;
};

const getEvents = (events, from, to) => {
  const timestamps = {
    start: new Date(from.year, from.month, from.date).getTime(),
    end: new Date(to.year, to.month, to.date).getTime()
  };

  const prepEvents = from.year === to.year
    ? events[from.year]
    : [...events[from.year], ...events[to.year]];

  const res = _.filter(prepEvents, o => (
    o.date_start >= (timestamps.start / 1000) && o.date_start <= (timestamps.end / 1000)
  ));
  return res;
};

export {
  updateObject,
  getNumberOfDays,
  getHoursFromTimestamps,
  getDaysOfYear,
  getDayOfWeek,
  isLeapYear,
  splitEventsArray,
  splitLoop,
  getEvents
};
