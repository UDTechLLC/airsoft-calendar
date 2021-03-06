import React from 'react';
import PropTypes from 'prop-types';

import styles from './Container.css';

const Container = ({ children, row, onClick, className }) => {
  const renderClassNames = () => {
    if (!className) return styles.Wrapper;
    else if (typeof className === 'string') return [styles.Wrapper, styles[className]].join(' ');

    return [styles.Wrapper, ...className].join(' ');
  };

  return (
    <div
      className={renderClassNames()}
      style={{ flexDirection: !row ? 'column' : 'row' }}
      onClick={onClick}
      onKeyPress={undefined}
      role="button"
      tabIndex="0"
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  row: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

Container.defaultProps = {
  children: undefined,
  row: false,
  onClick: () => undefined,
  className: null
};

export { Container };
