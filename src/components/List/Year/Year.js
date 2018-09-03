import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import { getNumberOfDays } from './../../../utils/utils';
import Month from './../Month/Month';
import Day from './../Day/Day';
import Events from './../Events/Events';
import EventButton from './../EventButton/EventButton';

import styles from './Year.css';

const Year = ({
  year,
  mode,
  eventLines,
  monthlyDayWidth,
  weeklyDayWidth,
  size,
  games,
  changeScale
}) => {
  const renderMonths = () => Array.apply([], Array(12)).map((v, month) => ((
    <Month year={year} month={month} mode={mode}>
      {mode === 'year' ?
        (<EventButton
          mode={mode}
          games={games[year] ? games[year] : []}
          eventLines={eventLines}
          changeScale={changeScale}
          year={year}
          month={month}
        />) :
        renderDays(month)}
    </Month>
  )));

  const renderDays = month => {
    const num = getNumberOfDays(year, month);
    const day = d => new Date(year, month, d + 1).getDay();

    return Array.apply([], Array(num)).map((v, d) => {
      const index = day(d);

      return (
        <Day
          key={d}
          weekend={index === 0 || index === 6}
          mode={mode}
          index={index}
          monthlyDayWidth={monthlyDayWidth}
          weeklyDayWidth={weeklyDayWidth}
          eventLines={eventLines}
        >
          {d + 1}
        </Day>
      );
    });
  };

  const renderEventsLayer = () => {
    if (mode === 'year') return undefined;

    return (
      <Events width={size.width} mode={mode} games={games[year] ? games[year] : []} year={year} />
    );
  };

  return (
    <div key={year} className={styles.Year}>
      <div>{year}</div>
      <div>{renderMonths()}</div>
      {renderEventsLayer()}
    </div>
  );
};

Year.propTypes = {
  size: PropTypes.shape(),
  year: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  eventLines: PropTypes.number.isRequired,
  monthlyDayWidth: PropTypes.number.isRequired,
  weeklyDayWidth: PropTypes.number.isRequired,
  games: PropTypes.shape(),
  changeScale: PropTypes.func.isRequired
};

Year.defaultProps = {
  size: { width: 0 },
  games: {}
};

export default sizeMe()(Year);
