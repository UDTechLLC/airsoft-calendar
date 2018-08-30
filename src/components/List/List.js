/* eslint-disable react/no-did-mount-set-state,prefer-destructuring,react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import EventObject from '../EventObject/EventObject';

import styles from './List.css';

class List extends Component {
  state = {
    // fullWidth: 0,
    eventLines: 0,
    monthlyDayWidth: (this.props.size.width - 62) / 31,
    weeklyDayWidth: (this.props.size.width - 14) / 7
  };

  // componentDidMount() {
  //   const { month, year } = this.props;
  //
  //   if (this[`year_${year}`] && this[`month_${year}_${month}`]) {
  //     this[`year_${year}`].scrollLeft = this.getDom(`month_${year}_${month}`).x;
  //   }
  //
  //   // if (this.month_0 && this.month_11) {
  //   //   const firstDom = this.getDom('month_0');
  //   //   const lastDom = this.getDom('month_11');
  //   //   this.setState({ fullWidth: Math.abs(firstDom.left) + Math.abs(lastDom.right) });
  //   // }
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { eventLines } = this.state;
  //
  //   return !(nextState.eventLines === eventLines) || true;
  // }

  // componentDidUpdate() {
  //   const { month, year } = this.props;
  //
  //   if (this[`year_${year}`] && this[`month_${year}_${month}`] &&
  // !this[`year_${year}`].scrollLeft) {
  //     this[`year_${year}`].scrollLeft = this.getDom(`month_${year}_${month}`).x;
  //   }
  // }

  getNumberOfDays = (y, m) => new Date(y, m < 11 ? m + 1 : 0, 0).getDate();

  getDom = refname => ReactDOM.findDOMNode(this[refname]).getBoundingClientRect();

  getHoursFromTimestamps = (end, start) => {
    const time = (end - start) / 3600;
    return parseFloat(time.toFixed(2), 10);
  };

  getDaysOfYear = () => (this.isLeapYear() ? 366 : 365);

  isLeapYear = () => {
    const { year } = this.props;
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  };

  handleScrollInstance = () => {
    const { size, changeVisualMonth } = this.props;

    const start = 0;
    const middle = start + (size.width / 2);
    const end = start + size.width;

    if (!this.month_0 && !this.month_11) return undefined;

    const month = Array.apply([], Array(12)).map((v, i) => {
      const dom = this.getDom(`month_${i}`);
      const mStart = dom.x;
      const mEnd = dom.x + dom.width;

      if ((mStart > start && mStart < middle) || (mEnd <= end && mEnd > middle)) return i;

      return undefined;
    });

    const currentMonth = _.filter(month, _.isNumber)[0] || 0;
    // console.log(currentMonth);

    changeVisualMonth(currentMonth);
  };

  // renderYear = (children = <div />, callback = () => undefined) => {
  //   const { year, mode } = this.props;
  //   const { eventLines } = this.state;
  //
  //   switch (mode) {
  //     case 'year':
  //       return (
  //         <div
  //           className={[
  //             styles.Year,
  //             styles.YearWithLabel
  //           ].join(' ')}
  //           ref={el => { this[`year_${year}`] = el; }}
  //         >
  //           <div>
  //             {year}
  //           </div>
  //           <div style={{ minHeight: !eventLines ? 27 : eventLines * 27 }}>
  //             {callback(year)}
  //           </div>
  //         </div>
  //       );
  //     default: return (
  //       <div className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
  //         {children}
  //         {this.renderEventsObjects(year)}
  //       </div>
  //     );
  //   }
  // };

  renderYear = year => {
    const { mode } = this.props;

    if (mode === 'year') {
      return (
        <div key={year} className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
          <div>{year}</div>
          <div>
            {this.renderMonths(year, m => this.renderEventCircle(year, m))}
          </div>
        </div>
      );
    }

    return (
      <div key={year} className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
        <div>{year}</div>
        <div>
          {this.renderMonths(year, m => this.renderDays(year, m))}
        </div>
        {this.renderEventsObjects(year)}
      </div>
    );
  };

  renderMonths = (year, callback = () => <div />) => {
    const { mode } = this.props;

    return (Array.apply([], Array(12)).map((v, month) => (
      <div
        key={month}
        className={styles.Month}
        style={{ flex: mode !== 'year' ? this.getNumberOfDays(year, month) : 1 }}
        ref={el => { this[`month_${year}_${month}`] = el; }}
      >
        <div>{mode !== 'year' ? MONTH_NAMES[month] : MONTH_NAMES[month].substr(0, 3)}</div>
        <div>{callback(month)}</div>
      </div>
    )));
  };

  renderDays = (year, month) => {
    const { mode } = this.props;
    const { eventLines, monthlyDayWidth, weeklyDayWidth } = this.state;

    const num = this.getNumberOfDays(year, month);
    const day = d => new Date(year, month, d + 1).getDay();

    return Array.apply([], Array(num)).map((v, d) => (
      <div
        key={d}
        className={[
          styles.Day,
          day(d) === 0 || day(d) === 6 ? styles.Weekend : undefined
        ].join(' ')}
      >
        <div>{mode !== 'week' ? DAY_NAMES[day(d)].substr(0, 3) : DAY_NAMES[day(d)]}</div>
        <div
          style={{
            width: mode !== 'week' ? monthlyDayWidth : weeklyDayWidth,
            height: !eventLines ? 27 : eventLines * 27
          }}
        >
          {d + 1}
        </div>
      </div>
    ));
  };

  renderEventsObjects = year => {
    const { mode, games } = this.props;
    // const { eventLines } = this.state;
    const firstDom = this.getDom(`month_${year}_0`);
    const lastDom = this.getDom(`month_${year}_11`);
    const yearWidth = Math.abs(lastDom.right) - Math.abs(firstDom.left);

    // if something went wrong or this is wrong mode
    if (!yearWidth || mode === 'year') return undefined;

    // console.log(games[year]);
    // check if there`s some coincidence
    let gamesArr = this.splitEventsArray(games[year]);

    if (!gamesArr[1] || !gamesArr[1].length) {
      //  if there is no coincidence
      gamesArr.splice(1, 1);
    } else {
      //  if there's some coincidence - check coincidence array to the end
      gamesArr = this.splitLoop(gamesArr);
    }
    console.log(year, yearWidth);

    //  if there is no games
    if (!gamesArr[0].length) {
      return <div className={styles.Events} style={{ width: yearWidth }} />;
    }

    const unit = yearWidth / (this.getDaysOfYear() * 24);
    const firstDayOfYear = new Date(year, 0, 1).getTime() / 1000;

    // if (eventLines !== gamesArr.length) {
    //   this.setState({ eventLines: gamesArr.length });
    // }

    return (
      <div className={styles.Events} style={{ width: yearWidth }}>
        {gamesArr.map((row, i) => (
          <div
            key={`${i}_${row.length}`}
            className={styles.EventsRow}
          >
            {row.map(event => (
              <EventObject
                key={event.id}
                event={event}
                style={{
                  left: this.getHoursFromTimestamps(event.date_start, firstDayOfYear) * unit,
                  width: this.getHoursFromTimestamps(event.date_end, event.date_start) * unit
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // split array on two - without crosses, and that one, that cross them
  splitEventsArray = array => {
    let firstArray = [...array];
    let secondArray = [];

    for (let i = 0; i < firstArray.length; i += 1) {
      const item = firstArray[i];
      // eslint-disable-next-line no-loop-func
      const partition = _.partition(firstArray, o => {
        const j = firstArray.indexOf(o);
        return i !== j && (
          (o.date_start >= item.date_start && o.date_start <= item.date_end) ||
          (o.date_end >= item.date_start && o.date_end <= item.date_end)
        );
      });
      firstArray = partition[1];
      secondArray = _.uniq([...secondArray, ...partition[0]]);
    }

    return [firstArray, secondArray];
  };

  // loop split
  splitLoop = gamesArr => {
    let array = [...gamesArr];

    do {
      const newSplit = this.splitEventsArray(array[array.length - 1]);
      array.splice(array.length - 1, 1);
      array = [...array, ...newSplit];
    } while (array[array.length - 1].length);

    array.splice(array.length - 1, 1);

    return array;
  };

  renderEventCircle = (year, month) => {
    const { mode, games, changeScale } = this.props;
    const { eventLines } = this.state;

    const timestamp = {
      start: new Date(year, month, 1).getTime(),
      end: new Date(year, month + 1, 0).getTime()
    };

    const events = _.filter(games[year], o => (
      o.date_start >= (timestamp.start / 1000) && o.date_start <= (timestamp.end / 1000)
    )) || [];

    if (!events.length) return <div className={styles.MonthCircleWrapper} style={{ display: 'block' }} />;

    return (
      <div
        className={styles.MonthCircleWrapper}
        style={{ height: !eventLines ? 58 : eventLines * 27 }}
      >
        <button
          type="button"
          className={styles.EventCircle}
          onClick={() => changeScale(year, month, mode === 'year' ? 'month' : 'week')}
        >
          {events.length}
        </button>
      </div>
    );
  };

  renderContent = () => {
    const { games } = this.props;
    if (games === null) return undefined;

    const years = Object.keys(games);
    if (!years) return <div className={[styles.Year, styles.EmptyYear].join(' ')}>There is no info</div>;

    return years.map(year => this.renderYear(year));
  };

  render() {
    return (
      <div
        ref={el => { this.instance = el; }}
        onScroll={e => this.handleScrollInstance(e)}
        className={styles.Wrapper}
      >
        {this.renderContent()}
      </div>
    );
  }
}

List.propTypes = {
  size: PropTypes.shape().isRequired,
  mode: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  // month: PropTypes.number.isRequired,
  games: PropTypes.shape(),
  changeScale: PropTypes.func.isRequired,
  changeVisualMonth: PropTypes.func.isRequired
};

List.defaultProps = {
  games: null
};

export default sizeMe()(List);
