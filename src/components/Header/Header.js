import React from 'react';
import PropTypes from 'prop-types';

import { Button, Container } from './../common';

import styles from './Header.css';

const Header = ({ filter, mode, changeMode, onManipulationClick, onChangeFilter }) => (
  <Container>
    <div className={styles.Top}>
      <div>
        <Button
          className={filter !== 'city' ? undefined : 'Active'}
          onClick={() => onChangeFilter('city')}
        >
          City
        </Button>
        <Button
          className={filter !== 'country' ? undefined : 'Active'}
          onClick={() => onChangeFilter('country')}
        >
          Country
        </Button>
        <Button
          className={filter !== 'region' ? undefined : 'Active'}
          onClick={() => onChangeFilter('region')}
        >
          Region
        </Button>
        <Button
          className={filter !== 'world' ? undefined : 'Active'}
          onClick={() => onChangeFilter('world')}
        >
          World
        </Button>
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
  onManipulationClick: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired
};

Header.defaultProps = {
  filter: null
};

export default Header;
