import React from 'react';
import PropTypes from 'prop-types';

import styles from './EventLine.css';

const EventLine = ({ style, event }) => {
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

EventLine.propTypes = {
  style: PropTypes.shape(),
  event: PropTypes.shape(),
};

EventLine.defaultProps = {
  style: {},
  event: {
    title: 'EventLine',
    startTime: '00:00',
    endTime: '00:00',
  }
};

export default EventLine;
