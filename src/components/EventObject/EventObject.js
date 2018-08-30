import React from 'react';
import PropTypes from 'prop-types';

import styles from './EventObject.css';

// eslint-disable-next-line arrow-body-style
const EventObject = ({ style/* , event */ }) => {
  // const getHM = timestamp => {
  //   const date = new Date(timestamp);
  //   return `${date.getHours()}:${date.getMinutes()}`;
  // };

  return (
    <div
      className={styles.Wrapper}
      style={{ backgroundColor: '#dcc04a', ...style }}
    >
      {/*
      <span>{getHM(event.date_start)}</span>
      <span>{event.name}</span>
      <span>{getHM(event.date_end)}</span>
      */}
    </div>
  );
};

EventObject.propTypes = {
  style: PropTypes.shape(),
  // event: PropTypes.shape(),
};

EventObject.defaultProps = {
  style: {},
  // event: {
  //   name: 'EventLine',
  //   date_start: '00:00',
  //   date_end: '00:00',
  // }
};

export default EventObject;
