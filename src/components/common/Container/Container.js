import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children, row }) => (
  <div
    className={styles.Wrapper}
    style={{ flexDirection: !row ? 'column' : 'row' }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  row: PropTypes.bool
};

Container.defaultProps = {
  children: undefined,
  row: false
};

export { Container };
