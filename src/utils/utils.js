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

export {
  updateObject,
  getNumberOfDays,
  getHoursFromTimestamps,
  getDaysOfYear,
  isLeapYear,
  splitEventsArray,
  splitLoop
};
