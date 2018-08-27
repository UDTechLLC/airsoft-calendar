/* eslint-disable react/no-did-mount-set-state,prefer-destructuring,react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import _ from 'lodash';
// import ReactList from 'react-list';

// import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import EventObject from '../EventObject/EventObject';

import styles from './List.css';

class List extends Component {
  state = { fullWidth: 0 };

  componentDidMount() {
    const { month, year } = this.props;

    if (this[`year_${year}`] && this[`month_${month}`]) {
      this[`year_${year}`].scrollLeft = this.getDom(`month_${month}`).x;
    }

    if (this.month_0 && this.month_11) {
      const firstDom = this.getDom('month_0');
      const lastDom = this.getDom('month_11');
      this.setState({ fullWidth: Math.abs(firstDom.left) + Math.abs(lastDom.right) });
    }
  }

  componentDidUpdate() {
    const { month, year } = this.props;

    if (this[`year_${year}`] && this[`month_${month}`] && !this[`year_${year}`].scrollLeft) {
      this[`year_${year}`].scrollLeft = this.getDom(`month_${month}`).x;
    }
  }

  getNumberOfDays = (y, m) => new Date(y, m < 11 ? m + 1 : 0, 0).getDate();

  getDom = refname => ReactDOM.findDOMNode(this[refname]).getBoundingClientRect();

  getHoursFromTimestamps = (end, start) => {
    const time = (end - start) / 3600;
    return parseFloat(time.toFixed(2), 10);
  };

  daysOfYear = () => (this.isLeapYear() ? 366 : 365);

  isLeapYear = () => {
    const { year } = this.props;
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  };

  handleScrollInstance = () => {
    // const { month } = this.props;
    // console.log(ReactDOM.findDOMNode(this.instance).scrollLeft);
    // console.log(e.target.scrollLeft);
    // console.log(this.getDom(`month-${month}`));
  };

  renderYear = (children = <div />, callback = () => undefined) => {
    const { year, mode } = this.props;

    switch (mode) {
      case 'year':
        return (
          <div className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
            {callback(year)}
          </div>
        );
      default: return (
        <div className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
          {children}
          {this.renderEventsObjects(year)}
        </div>
      );
    }
  };

  renderMonths = (callback = () => <div />) => {
    const { year } = this.props;

    return Array.apply([], Array(12)).map((v, m) => (
      <div
        key={m}
        className={styles.Month}
        style={{ flex: this.getNumberOfDays(year, m) }}
        ref={el => { this[`month_${m}`] = el; }}
      >
        {/* <div>
        {MONTH_NAMES[m]}
      </div>
      <div> */}
        {callback(year, m)}
        {/* </div> */}
      </div>
    ));
  };

  renderDays = (year, month) => {
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
        {/* <div>
          {DAY_NAMES[day(d)]}
        </div>
        <div> */}
        {d + 1}
        {/* </div> */}
      </div>
    ));
  };

  renderEventsObjects = (year = this.props.year) => {
    const { mode, games } = this.props;
    const { fullWidth } = this.state;

    // if something went wrong or this is wrong mode
    if (!fullWidth || mode !== 'week') return undefined;

    // check if there`s some coincidence
    let gamesArr = this.splitEventsArray(games);

    if (!gamesArr[1] || !gamesArr[1].length) {
      //  if there is no coincidence
      gamesArr.splice(1, 1);
    } else {
      //  if there's some coincidence - check coincidence array to the end
      gamesArr = this.splitLoop(gamesArr);
    }

    //  if there is no games
    if (!gamesArr[0].length) {
      return <div className={styles.Events} style={{ width: fullWidth }} />;
    }

    const unit = fullWidth / (this.daysOfYear() * 24);
    const firstDayOfYear = new Date(year, 0, 1).getTime() / 1000;

    return (
      <div className={styles.Events} style={{ width: fullWidth }}>
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
                  left: this.getHoursFromTimestamps(event.startDate, firstDayOfYear) * unit,
                  width: this.getHoursFromTimestamps(event.endDate, event.startDate) * unit
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
          (o.startDate >= item.startDate && o.startDate <= item.endDate) ||
          (o.endDate >= item.startDate && o.endDate <= item.endDate)
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

  renderEventCircle = (year = this.props.year, month = this.props.month) => {
    const { mode, games, changeScale } = this.props;

    let timestamp = {
      start: new Date(year, month, 1).getTime(),
      end: new Date(year, month + 1, 0).getTime()
    };

    if (mode === 'year') {
      timestamp = {
        start: new Date(year, 0, 1).getTime(),
        end: new Date(year, 11, 0).getTime()
      };
    }

    const events = _.filter(games, o => (
      o.startDate >= (timestamp.start / 1000) && o.startDate <= (timestamp.end / 1000)
    )) || [];

    return (
      <button
        type="button"
        className={styles.EventCircle}
        onClick={() => changeScale(year, month, mode === 'year' ? 'month' : 'week')}
      >
        {events.length}
      </button>
    );
  };

  renderContent = () => {
    const { mode } = this.props;

    switch (mode) {
      case 'year':
        return this.renderYear(undefined, y => this.renderEventCircle(y));
      case 'month':
        return this.renderYear(this.renderMonths((y, m) => this.renderEventCircle(y, m)));
      default:
        return this.renderYear(this.renderMonths((y, m) => this.renderDays(y, m)));
    }
  };

  render() {
    return (
      <div
        ref={el => { this.instance = el; }}
        onScroll={e => this.handleScrollInstance(e)}
      >
        {this.renderContent()}
      </div>
    );
  }
}

List.propTypes = {
  // size: PropTypes.shape().isRequired,
  mode: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape()),
  changeScale: PropTypes.func.isRequired
};

List.defaultProps = {
  games: []
};

export default sizeMe()(List);
