import React from 'react';
import PropTypes from 'prop-types';

import styles from './EventObject.css';

const EventObject = ({ style, event }) => {
  const getHM = timestamp => {
    const date = new Date(timestamp * 1000);
    const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const m = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${h}:${m}`;
  };

  return (
    <div
      className={styles.Wrapper}
      style={{ backgroundColor: '#dcc04a', ...style }}
    >
      <div className={styles.Content}>
        <span>{getHM(event.date_start)}</span>
        {/* <span>{event.name}</span> */}
        <span>{getHM(event.date_end)}</span>
      </div>
      <div className={styles.HoverInfo}>
        {Object.keys(event).map((k, i) => <p key={i}>{k}: {event[k]}</p>)}
      </div>
    </div>
  );
};

EventObject.propTypes = {
  style: PropTypes.shape(),
  event: PropTypes.shape(),
};

EventObject.defaultProps = {
  style: {},
  event: {
    name: 'EventLine',
    date_start: '00:00',
    date_end: '00:00',
  }
};

export default EventObject;
