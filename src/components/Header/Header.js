import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './../common';

import styles from './Header.css';

const Header = ({ mode, changeMode }) => (
  <div className={styles.Wrapper}>
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
);

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default Header;
