/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const Backdrop = props => (
  !props.show
    ? null
    : (
      <div
        className={
          !props.transparent
            ? classes.Backdrop
            : [classes.Transparent, classes.Backdrop].join(' ')
        }
        onClick={props.clicked}
      />
    )
);

Backdrop.propTypes = {
  show: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node
  ]),
  transparent: PropTypes.bool,
  clicked: PropTypes.func.isRequired
};

Backdrop.defaultProps = {
  show: '',
  transparent: false
};

export { Backdrop };
