/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { Container, Select, Button } from './../common';

import styles from './Header.css';
/* filter, mode, changeMode, onManipulationClick, onChangeFilter, */
const Header = ({ filters, scale, changeScale, locations, onChangeFilter }) => (
  <Container style={{ zIndex: 1 }}>
    <div className={styles.Filters}>
      {Object.keys(locations).map(k => (
        <Select
          key={v4()}
          options={locations[k]}
          active={filters[k]}
          onClick={v => onChangeFilter(k, v)}
        />
      ))}
    </div>
    <div className={styles.Scale}>
      <div
        className={[
          styles.ScaleButtons,
          scale === 'week' ? undefined : (scale === 'month' ? styles.Month : styles.Year)
        ].join(' ')}
      >
        <Button onClick={() => changeScale('week')}>
          Week
        </Button>
        <Button onClick={() => changeScale('month')}>
          Month
        </Button>
        <Button onClick={() => changeScale('year')}>
          Year
        </Button>
      </div>
    </div>
    {/*
    <div className={styles.Top}>
      <div>
        <Button
          className={filters !== 'city' ? undefined : 'Active'}
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
    */}
  </Container>
);

Header.propTypes = {
  scale: PropTypes.string.isRequired,
  changeScale: PropTypes.func.isRequired,
  // onManipulationClick: PropTypes.func.isRequired,
  filters: PropTypes.shape(),
  onChangeFilter: PropTypes.func.isRequired,
  locations: PropTypes.shape().isRequired
};

Header.defaultProps = {
  filters: {}
};

export default Header;
