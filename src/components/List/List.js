import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import Year from './Year/Year';

import styles from './List.css';

class List extends Component {
  state = {
    monthlyDayWidth: parseFloat(((this.props.size.width - 62) / 31).toFixed(2), 10),
    weeklyDayWidth: parseFloat(((this.props.size.width - 14) / 7).toFixed(2), 10)
  };

  componentDidUpdate() {
    const { scrollProgress } = this.props;
    const listFullWidth = this.instance.scrollWidth;
    this.instance.scrollLeft = listFullWidth * scrollProgress;
  }

  scrollList = () => {
    const { mode, size, scrollProgress } = this.props;
    const { monthlyDayWidth, weeklyDayWidth } = this.state;

    //  if default position
    const today = new Date();
    const thisYear = today.getFullYear();

    //  if there is no data ref or th list was scrolled
    if (!this[`year_${thisYear}`] || scrollProgress) return;

    //  if this year have rendered
    const thisYearDOM = this[`year_${thisYear}`].domEl;
    const thisYearInitialX = thisYearDOM.offsetLeft;

    if (mode === 'year') {
      const thisMonth = today.getMonth();

      const yearWidth = thisYearDOM.clientWidth;
      const monthWidth = yearWidth / 12;

      this.instance.scrollLeft = (thisYearInitialX + ((thisMonth + 0.5) * monthWidth))
        - (size.width / 2);
      return;
    }

    const thisYearStart = new Date(thisYear, 0, 0);
    const diff = today - thisYearStart;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const dayWidth = mode === 'week' ? (weeklyDayWidth + 2) : (monthlyDayWidth + 2);

    this.instance.scrollLeft = (thisYearInitialX + (dayOfYear * dayWidth))
      - ((size.width / 2) + (1.5 * dayWidth));
  };

  handleScroll = () => {
    const { onScrollProgress } = this.props;

    const listFullWidth = this.instance.scrollWidth;
    // const middleIs = this.instance.scrollLeft + (this.props.size.width / 2);
    const scrollProgress = this.instance.scrollLeft / listFullWidth;

    onScrollProgress(scrollProgress);
  };

  onMouseWheel = e => {
    this.instance.scrollLeft = this.instance.scrollLeft + e.deltaY;
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

    //  16.67 ms -> 60fps
    setTimeout(this.scrollList, 8.34);

    return years.map((year, i) => (
      <Year
        ref={el => { this[`year_${year}`] = el; }}
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

  render() {
    return (
      <div
        ref={el => { this.instance = el; }}
        className={styles.Wrapper}
        onScroll={e => this.handleScroll(e)}
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
  scrollProgress: PropTypes.number,
  onScrollProgress: PropTypes.func.isRequired
};

List.defaultProps = {
  scrollProgress: null,
  games: null
};

export default sizeMe()(List);
