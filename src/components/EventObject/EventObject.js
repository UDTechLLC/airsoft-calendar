import React from 'react';
import PropTypes from 'prop-types';

import styles from './EventObject.css';

const EventObject = ({ style, event }) => {
  const { title, startTime, endTime } = event;
  return (
    <div
      className={styles.Wrapper}
      style={{ backgroundColor: '#dcc04a', ...style }}
    >
      <span>{startTime}</span>
      <span>{title}</span>
      <span>{endTime}</span>
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
    title: 'EventLine',
    startTime: '00:00',
    endTime: '00:00',
  }
};

export default EventObject;
