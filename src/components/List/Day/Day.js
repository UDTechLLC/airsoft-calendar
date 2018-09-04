import React from 'react';
import PropTypes from 'prop-types';

import { DAY_NAMES } from './../../../utils/const';

import styles from './Day.css';

const Day = ({ weekend, mode, index, monthlyDayWidth, weeklyDayWidth, eventRows, children }) => (
  <div
    className={[
      styles.Day,
      weekend ? styles.Weekend : undefined
    ].join(' ')}
    style={{
      width: mode !== 'week' ? (monthlyDayWidth + 2) : (weeklyDayWidth + 2)
    }}
  >
    <div style={{ width: mode !== 'week' ? monthlyDayWidth : weeklyDayWidth }}>
      {mode !== 'week' ? DAY_NAMES[index].substr(0, 3) : DAY_NAMES[index]}
    </div>
    <div
      style={{
        width: mode !== 'week' ? monthlyDayWidth : weeklyDayWidth,
        height: !eventRows ? 27 : eventRows * 27
      }}
    >
      {children}
    </div>
  </div>
);

Day.propTypes = {
  weekend: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  monthlyDayWidth: PropTypes.number.isRequired,
  weeklyDayWidth: PropTypes.number.isRequired,
  eventRows: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number
  ])
};

Day.defaultProps = {
  weekend: false,
  children: <div />
};

export default Day;
