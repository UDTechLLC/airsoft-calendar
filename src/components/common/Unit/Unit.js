import React from 'react';
import PropTypes from 'prop-types';

import styles from './Unit.css';
import { Container } from './../';

const Unit = ({
  label, children, weekend, onClick, commonStyle, lowLevel, midLevel, className
}) => (
  <Container
    onClick={onClick}
    commonStyle={commonStyle}
    className={className}
  >
    <div className={styles.Label}>{label}</div>
    <div
      className={[
        styles.Content,
        !weekend ? undefined : styles.Light,
        !lowLevel ? undefined : styles.LowLevel,
        !midLevel ? undefined : styles.MidLevel
      ].join(' ')}
    >
      <span>
        {children}
      </span>
    </div>
  </Container>
);

Unit.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  weekend: PropTypes.bool,
  onClick: PropTypes.func,
  commonStyle: PropTypes.shape(),
  lowLevel: PropTypes.bool,
  midLevel: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

Unit.defaultProps = {
  label: 'Label',
  children: null,
  weekend: false,
  onClick: () => undefined,
  commonStyle: {},
  lowLevel: false,
  midLevel: false,
  className: undefined
};

export { Unit };
