import React from 'react';
import PropTypes from 'prop-types';

import styles from './EventLine.css';

const EventLine = ({ style, title, startTime, endTime }) => (
  <div
    className={styles.Wrapper}
    style={style}
  >
    <span>{startTime}</span>
    <span>{title}</span>
    <span>{endTime}</span>
  </div>
);

EventLine.propTypes = {
  style: PropTypes.shape(),
  title: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

EventLine.defaultProps = {
  style: {
    backgroundColor: '#dcc04a'
  },
  title: 'EventLine',
  startTime: '00:00',
  endTime: '00:00',
};

export default EventLine;
