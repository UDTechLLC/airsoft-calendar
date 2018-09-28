import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children, row, onClick, onScroll }) => (
  <div
    className={styles.Wrapper}
    style={{ flexDirection: !row ? 'column' : 'row' }}
    onClick={onClick}
    onKeyPress={undefined}
    role="button"
    tabIndex="0"
    onWheel={onScroll}
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
  onClick: PropTypes.func,
  onScroll: PropTypes.func
};

Container.defaultProps = {
  children: undefined,
  row: false,
  onClick: () => undefined,
  onScroll: () => undefined
};

export { Container };
