import React from 'react';
import PropTypes from 'prop-types';

import styles from './Unit.css';
import { Container } from './../';

const Unit = ({ label, children, weekend, onClick, className }) => (
  <Container onClick={onClick} className={className} >
    <div className={styles.Label}>{label}</div>
    <div className={[styles.Content, !weekend ? undefined : styles.Light].join(' ')}>
      {children}
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
  className: undefined
};

export { Unit };
