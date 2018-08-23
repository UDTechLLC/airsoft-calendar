import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './../common';

import styles from './Header.css';

const Header = ({ month, changeMode }) => (
  <div className={styles.Wrapper}>
    <div />
    <div>
      {month}
    </div>
    <div>
      <Button onClick={() => changeMode('weekend')}>
        Weekend
      </Button>
      <Button onClick={() => changeMode('week')}>
        Week
      </Button>
      <Button onClick={() => changeMode('month')}>
        Month
      </Button>
      <Button onClick={() => changeMode('year')}>
        Year
      </Button>
    </div>
  </div>
);

Header.propTypes = {
  month: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default Header;
