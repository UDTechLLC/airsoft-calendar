/* eslint-disable react/no-did-mount-set-state,prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import _ from 'lodash';
// import ReactList from 'react-list';

// import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import EventLine from './../EventLine/EventLine';

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
      // console.log(firstDom);
      // console.log(lastDom);
      this.setState({ fullWidth: Math.abs(firstDom.left) + Math.abs(lastDom.right) });
    }
  }

  getNumberOfDays = (y, m) => new Date(y, m, 0).getDate();

  getDom = refname => ReactDOM.findDOMNode(this[refname]).getBoundingClientRect();

  getHoursFromTimestamps = (end, start) => {
    // console.log('end', new Date(end * 1000));
    // console.log('start', new Date(start * 1000));
    const time = (end - start) / 3600;
    // console.log(parseFloat(time.toFixed(2), 10));
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

  renderYear = (children = <div />) => {
    const { year } = this.props;

    return (
      <div className={styles.Year} ref={el => { this[`year_${year}`] = el; }}>
        {children}
        {this.renderEvents(year)}
      </div>
    );
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
    const day = d => new Date(year, month, d).getDay();

    return Array.apply([], Array(num)).map((v, d) => (
      <div
        key={d}
        className={[
          styles.Day,
          day(d) === 6 || day(d) === 0 ? styles.Weekend : undefined
        ].join(' ')}
      >
        {/* <div>
          {DAY_NAMES[day(d)]}
        </div>
        <div> */}
        {d}
        {/* </div> */}
      </div>
    ));
  };

  renderEvents = (year = this.props.year) => {
    const { games } = this.props;
    const { fullWidth } = this.state;
    // if something went wrong
    if (!fullWidth) return undefined;
    // check if there`s some coincidence
    let gamesArr = this.splitEventsArray(games);

    if (!gamesArr[1] || !gamesArr[1].length) {
      gamesArr.splice(1, 1);
    } else {
      gamesArr = this.splitLoop(gamesArr);
    }

    if (!gamesArr[0].length) {
      return <div className={styles.Events} style={{ width: fullWidth }} />;
    }

    const unit = fullWidth / (this.daysOfYear() * 24);
    // console.log(1178 * 12, fullWidth);
    // console.log(fullWidth / this.daysOfYear());
    const firstDayOfYear = new Date(year, 0, 1).getTime() / 1000;
    console.log(new Date(year, 0, 1).getTime() / 1000);

    return (
      <div className={styles.Events} style={{ width: fullWidth }}>
        {gamesArr.map((row, i) => (
          <div
            key={`${i}_${row.length}`}
            className={styles.EventsRow}
          >
            {row.map(event => (
              <EventLine
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

  renderContent = () => {
    const { mode } = this.props;

    switch (mode) {
      case 'year':
        return this.renderYear();
      case 'month':
        return this.renderYear(this.renderMonths());
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
  games: PropTypes.arrayOf(PropTypes.shape())
};

List.defaultProps = {
  games: []
};

// ListContainer.defaultProps = {
//   games: []
// };

export default sizeMe()(List);

// import React from 'react';
// import PropTypes from 'prop-types';
// import ReactList from 'react-list';
// // import LazyLoading from 'react-list-lazy-load';
//
// import styles from './List.css';
//
// const List = ({ length, initialIndex }) => {
//   const renderItem = (index, key) => (
//     <div key={key} style={{ width: 100 }}>
//       {index + 1}
//     </div>
//   );
//
//   return (
//     <div className={styles.Wrapper}>
//       <ReactList
//         axis="x"
//         initialIndex={initialIndex}
//         length={length}
//         itemRenderer={renderItem}
//       />
//     </div>
//   );
// };
//
// List.propTypes = {
//   length: PropTypes.number.isRequired,
//   initialIndex: PropTypes.number.isRequired,
// };
//
// export default List;
