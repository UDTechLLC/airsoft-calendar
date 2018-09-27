import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container } from './../common';

import styles from './Header.css';

const Header = ({ mode, changeMode, onManipulationClick }) => (
  <Container>
    <div className={styles.Top}>
      <div>
        <Button>City</Button>
        <Button>Country</Button>
        <Button>Region</Button>
        <Button className="Active">World</Button>
      </div>
      <div />
      <div>
        <Button
          onClick={() => changeMode('week')}
          className={mode === 'week' ? 'Active' : undefined}
        >
          Week
        </Button>
        <Button
          onClick={() => changeMode('month')}
          className={mode === 'month' ? 'Active' : undefined}
        >
          Month
        </Button>
        <Button
          onClick={() => changeMode('year')}
          className={mode === 'year' ? 'Active' : undefined}
        >
          Year
        </Button>
      </div>
    </div>
    <div className={styles.Bottom}>
      <Button onClick={() => onManipulationClick('prev')}>&#171;</Button>
      <Button onClick={() => onManipulationClick('next')}>&#187;</Button>
    </div>
  </Container>
);

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  onManipulationClick: PropTypes.func.isRequired
};

export default Header;
