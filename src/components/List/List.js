/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
// import ReactList from 'react-list';

// import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';

import styles from './List.css';

class List extends Component {
  state = { fullWidth: 0 };

  componentDidMount() {
    const { month, year } = this.props;

    if (this[`year_${year}`] && this[`month_${month}`]) {
      this[`year_${year}`].scrollLeft = this.getDom(`month_${month}`).x;
    }
    if (this.month_11) {
      const dom = this.getDom('month_11');
      this.setState({ fullWidth: dom.x + dom.width });
    }
  }

  getNumberOfDays = (y, m) => new Date(y, m, 0).getDate();

  getDom = refname => ReactDOM.findDOMNode(this[refname]).getBoundingClientRect();

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
      </div>
    );
  };

  renderMonths = (children = <div />) => Array.apply([], Array(12)).map((v, m) => (
    <div key={m} className={styles.Month} ref={el => { this[`month_${m}`] = el; }}>
      {/* <div>
        {MONTH_NAMES[m]}
      </div>
      <div> */}
      {children}
      {/* </div> */}
    </div>
  ));

  renderDays = () => {
    const { year, month } = this.props;
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

  renderEvents = () => {
    // const { year } = this.props;
    const { fullWidth } = this.state;

    // if (this.month_11) {
    //   console.log(this.getDom('month_11').x + this.getDom('month_11').width);
    // }
    if (fullWidth) {
      console.log(fullWidth, fullWidth / (this.daysOfYear() * 24));
    }
  };

  renderContent = () => {
    const { mode } = this.props;

    switch (mode) {
      case 'year':
        return this.renderYear();
      case 'month':
        return this.renderYear(this.renderMonths());
      default:
        return this.renderYear(this.renderMonths(this.renderDays(this.renderEvents())));
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
  month: PropTypes.number.isRequired
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
