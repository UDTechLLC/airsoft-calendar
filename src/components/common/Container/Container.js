import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children }) => (
  <div className={styles.Wrapper}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};

Container.defaultProps = {
  children: undefined
};

export { Container };
