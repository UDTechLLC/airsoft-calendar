import React from 'react';
import PropTypes from 'prop-types';

import styles from './Unit.css';
import { Container } from './../';

const Unit = ({ label, children }) => (
  <Container>
    <div className={styles.Label}>{label}</div>
    <div className={styles.Content}>{children}</div>
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
  ])
};

Unit.defaultProps = {
  label: 'Label',
  children: null
};

export { Unit };
