/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { Container, Select, Button } from './../common';

import styles from './Header.css';

const Header = ({ filters, scale, changeScale, availableFilters, onChangeFilter }) => {
  const renderFilters = () => {
    const { address } = availableFilters;
    const gameTypes = availableFilters.game_types || [];
    const { country, region, city, gameType } = filters;

    const countries = address ? Object.keys(address) : [];
    const regions = country && countries && countries.length && address[country] ?
      Object.keys(address[country]) :
      [];
    const cities = region && regions && regions.length && address[country][region] ?
      address[country][region] :
      [];

    return (
      <div className={styles.Filters}>
        <Select
          key={v4()}
          options={[null, ...countries]}
          active={country}
          placeholder="All countries"
          onClick={v => onChangeFilter('country', v)}
        />
        <Select
          key={v4()}
          options={[null, ...regions]}
          active={region}
          placeholder="All regions"
          onClick={v => onChangeFilter('region', v)}
        />
        <Select
          key={v4()}
          options={[null, ...cities]}
          active={city}
          placeholder="All cities"
          onClick={v => onChangeFilter('city', v)}
        />
        <Select
          key={v4()}
          options={[null, ...gameTypes]}
          active={gameType}
          placeholder="All game types"
          onClick={v => onChangeFilter('gameType', v)}
        />
      </div>
    );
  };

  return (
    <Container style={{ zIndex: 1 }}>
      {renderFilters()}
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
    </Container>
  );
};

Header.propTypes = {
  scale: PropTypes.string.isRequired,
  changeScale: PropTypes.func.isRequired,
  filters: PropTypes.shape(),
  onChangeFilter: PropTypes.func.isRequired,
  availableFilters: PropTypes.shape().isRequired
};

Header.defaultProps = {
  filters: {}
};

export default Header;
