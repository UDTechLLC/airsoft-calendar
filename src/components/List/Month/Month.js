import React from 'react';
import PropTypes from 'prop-types';

import { MONTH_NAMES } from './../../../utils/const';
import { getNumberOfDays } from './../../../utils/utils';

import styles from './Month.css';

const Month = ({ year, month, mode, children }) => (
  <div
    key={month}
    className={styles.Month}
    style={{ flex: mode !== 'year' ? getNumberOfDays(year, month) : 1 }}
    ref={el => { this[`month_${year}_${month}`] = el; }}
  >
    <div>{mode !== 'year' ? MONTH_NAMES[month] : MONTH_NAMES[month].substr(0, 3)}</div>
    <div>{children}</div>
  </div>
);

Month.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  children: PropTypes.node
};

Month.defaultProps = {
  children: <div />
};

export default Month;
