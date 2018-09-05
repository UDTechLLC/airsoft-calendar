import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import { getNumberOfDays, getDaysOfYear } from './../../../utils/utils';
import Month from './../Month/Month';
import Day from './../Day/Day';
import Events from './../Events/Events';
import EventButton from './../EventButton/EventButton';

import styles from './Year.css';

class Year extends Component {
  renderMonths = () => {
    const { year, mode, games, eventRows, changeScale } = this.props;

    return Array.apply([], Array(12)).map((v, month) => ((
      <Month key={month} year={year} month={month} mode={mode}>
        {mode === 'year' ?
          (<EventButton
            mode={mode}
            games={games[year] ? games[year] : []}
            eventRows={eventRows}
            changeScale={changeScale}
            year={year}
            month={month}
          />) :
          this.renderDays(month)}
      </Month>
    )));
  };

  renderDays = month => {
    const { year, mode, monthlyDayWidth, weeklyDayWidth, eventRows } = this.props;

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
          eventRows={eventRows}
        >
          {d + 1}
        </Day>
      );
    });
  };

  renderEventsLayer = () => {
    const { year, mode, monthlyDayWidth, weeklyDayWidth, games, getEventRows } = this.props;

    const num = getDaysOfYear(year);
    let width; let unit;

    switch (mode) {
      case 'month':
        width = parseFloat(((num * (monthlyDayWidth + 2)) - 3.7).toFixed(2), 10);
        unit = (monthlyDayWidth + 2) / 24;
        break;
      case 'week':
        width = parseFloat(((num * (weeklyDayWidth + 2)) - 2.55).toFixed(2), 10);
        unit = (weeklyDayWidth + 2) / 24;
        break;
      default:
        return undefined;
    }

    return (
      <Events
        width={width}
        mode={mode}
        games={games[year] ? games[year] : []}
        year={year}
        unit={unit}
        getEventRows={rows => getEventRows(year, rows)}
      />
    );
  };

  render() {
    const { year } = this.props;

    return (
      <div className={styles.Year}>
        <div>{year}</div>
        <div>{this.renderMonths()}</div>
        {this.renderEventsLayer()}
      </div>
    );
  }
}

Year.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.shape(),
  year: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  eventRows: PropTypes.number.isRequired,
  monthlyDayWidth: PropTypes.number.isRequired,
  weeklyDayWidth: PropTypes.number.isRequired,
  games: PropTypes.shape(),
  changeScale: PropTypes.func.isRequired,
  getEventRows: PropTypes.func.isRequired
};

Year.defaultProps = {
  size: {},
  games: {}
};

export default sizeMe()(Year);
