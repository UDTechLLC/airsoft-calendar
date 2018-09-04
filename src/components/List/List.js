import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import Year from './Year/Year';

import styles from './List.css';

class List extends Component {
  state = {
    eventRows: [],
    monthlyDayWidth: parseFloat(((this.props.size.width - 62) / 31).toFixed(2), 10),
    weeklyDayWidth: parseFloat(((this.props.size.width - 14) / 7).toFixed(2), 10)
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

    changeVisualMonth(currentMonth);
  };

  renderContent = () => {
    const { games, mode, changeScale } = this.props;
    const { eventRows, monthlyDayWidth, weeklyDayWidth } = this.state;

    if (games === null) return undefined;

    const years = Object.keys(games);
    if (!years) return <div className={[styles.Year, styles.EmptyYear].join(' ')}>There is no info</div>;

    return years.map((year, i) => (
      <Year
        key={i}
        year={parseInt(year, 10)}
        mode={mode}
        eventRows={eventRows.length ? _.max(eventRows) : 1}
        monthlyDayWidth={monthlyDayWidth}
        weeklyDayWidth={weeklyDayWidth}
        games={games}
        changeScale={changeScale}
        getEventRows={rows => this.setState({ eventRows: rows })}
      />
    ));
  };

  render() {
    console.log(this.state.eventRows);
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
  games: PropTypes.shape(),
  changeScale: PropTypes.func.isRequired,
  changeVisualMonth: PropTypes.func.isRequired
};

List.defaultProps = {
  games: null
};

export default sizeMe()(List);
