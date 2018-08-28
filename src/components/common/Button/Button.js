import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.css';

const Button = ({ children, onClick, type, className }) => {
  const renderClassName = () => {
    if (!className) {
      return styles.Button;
    } else if (className && typeof className === 'string') {
      return [styles.Button, styles[className]].join(' ');
    }

    const classArray = className.map(c => styles[c]);
    return [styles.Button, ...classArray].join(' ');
  };

  return (
    <button
      className={renderClassName()}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

Button.defaultProps = {
  onClick: () => undefined,
  type: 'button',
  className: ''
};

export { Button };
