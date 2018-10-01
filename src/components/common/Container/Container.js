import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children, row, onClick }) => (
  <div
    className={styles.Wrapper}
    style={{ flexDirection: !row ? 'column' : 'row' }}
    onClick={onClick}
    onKeyPress={undefined}
    role="button"
    tabIndex="0"
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  row: PropTypes.bool,
  onClick: PropTypes.func
};

Container.defaultProps = {
  children: undefined,
  row: false,
  onClick: () => undefined
};

export { Container };
