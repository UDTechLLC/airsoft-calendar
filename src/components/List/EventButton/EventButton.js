import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './EventButton.css';

const EventButton = ({ mode, games, changeScale, eventRows, year, month }) => {
  const timestamp = {
    start: new Date(year, month, 1).getTime(),
    end: new Date(year, month + 1, 0).getTime()
  };

  const events = _.filter(games, o => (
    o.date_start >= (timestamp.start / 1000) && o.date_start <= (timestamp.end / 1000)
  )) || [];

  if (!events.length) return <div className={styles.MonthCircleWrapper} style={{ display: 'block' }} />;

  return (
    <div
      className={styles.MonthCircleWrapper}
      style={{ height: !eventRows ? 58 : eventRows * 27 }}
    >
      <button
        type="button"
        className={styles.EventCircle}
        onClick={() => changeScale(year, month, mode === 'year' ? 'month' : 'week')}
      >
        {events.length}
      </button>
    </div>
  );
};

EventButton.propTypes = {
  mode: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  changeScale: PropTypes.func.isRequired,
  eventRows: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired
};

export default EventButton;
