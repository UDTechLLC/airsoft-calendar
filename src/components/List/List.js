import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import Year from './Year/Year';

import styles from './List.css';

class List extends Component {
  state = {
    monthlyDayWidth: parseFloat(((this.props.size.width - 62) / 31).toFixed(2), 10),
    weeklyDayWidth: parseFloat(((this.props.size.width - 14) / 7).toFixed(2), 10)
  };

  getDom = refname => ReactDOM.findDOMNode(this[refname]).getBoundingClientRect();

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
    const { monthlyDayWidth, weeklyDayWidth } = this.state;

    if (games === null) return <div />;

    const years = Object.keys(games);
    if (!years) return <div className={[styles.Year, styles.EmptyYear].join(' ')}>There is no info</div>;

    const buildedRows = _.keysIn(this.state).filter(k => {
      const pos = k.indexOf('event_rows->');
      return pos >= 0 ? k.substr(0, pos + 12) : false;
    }).map(k => this.state[k]);

    return years.map((year, i) => (
      <Year
        key={i}
        year={parseInt(year, 10)}
        mode={mode}
        eventRows={buildedRows.length ? _.max(buildedRows) : 1}
        monthlyDayWidth={monthlyDayWidth}
        weeklyDayWidth={weeklyDayWidth}
        games={games}
        changeScale={changeScale}
        getEventRows={(key, rows) => {
         this.setState({ [`event_rows->${key}`]: rows });
        }}
      />
    ));
  };

  onMouseWheel = e => {
    this.instance.scrollLeft = this.instance.scrollLeft + e.deltaY;
  };

  render() {
    return (
      <div
        ref={el => { this.instance = el; }}
        className={styles.Wrapper}
        onScroll={e => this.handleScrollInstance(e)}
        onWheel={e => this.onMouseWheel(e)}
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
