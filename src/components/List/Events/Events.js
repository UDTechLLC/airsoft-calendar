import React from 'react';
import PropTypes from 'prop-types';

import { splitEventsArray, splitLoop, getDaysOfYear, getHoursFromTimestamps } from './../../../utils/utils';
import EventObject from './EventObject/EventObject';

import styles from './Events.css';


const Events = ({ width, mode, games, year }) => {
  // if something went wrong or this is wrong mode
  if (!width || mode === 'year') return undefined;

  // check if there`s some coincidence
  let gamesArr = splitEventsArray(games);

  if (!gamesArr[1] || !gamesArr[1].length) {
    //  if there is no coincidence
    gamesArr.splice(1, 1);
  } else {
    //  if there's some coincidence - check coincidence array to the end
    gamesArr = splitLoop(gamesArr);
  }

  //  if there is no games
  if (!gamesArr[0].length) {
    return <div className={styles.Events} style={{ width }} />;
  }

  const unit = width / (getDaysOfYear() * 24);
  const firstDayOfYear = new Date(year, 0, 1).getTime() / 1000;

  return (
    <div className={styles.Events} style={{ width }}>
      {gamesArr.map((row, i) => (
        <div
          key={`${i}_${row.length}`}
          className={styles.EventsRow}
        >
          {row.map(event => (
            <EventObject
              key={event.id}
              event={event}
              style={{
                left: getHoursFromTimestamps(event.date_start, firstDayOfYear) * unit,
                width: getHoursFromTimestamps(event.date_end, event.date_start) * unit
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

Events.propTypes = {
  width: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  games: PropTypes.shape().isRequired,
  year: PropTypes.number.isRequired
};

export default Events;
