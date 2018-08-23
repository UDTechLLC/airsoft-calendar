import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type }) => (
  <button
    style={{ position: 'relative' }}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string
};

Button.defaultProps = {
  onClick: () => undefined,
  type: 'button'
};

export { Button };
