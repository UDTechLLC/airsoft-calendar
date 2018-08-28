import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './../common';

import styles from './Header.css';

const Header = ({ mode, year, month, changeMode }) => {
  const renderMidBlock = () => {
    switch (mode) {
      case 'year':
        return <div>Check year</div>;
      case 'month':
        return <div>{year}</div>;
      default:
        return <div>{year} {month}</div>;
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div />
      {renderMidBlock()}
      <div>
        {/*
      <Button onClick={() => changeMode('weekend')}>
        Weekend
      </Button>
      */}
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
};

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default Header;
