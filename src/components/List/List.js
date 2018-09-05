import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import Year from './Year/Year';

import styles from './List.css';

class List extends Component {
  state = {
    date: new Date(),
    lastDate: undefined,
    monthlyDayWidth: parseFloat(((this.props.size.width - 62) / 31).toFixed(2), 10),
    weeklyDayWidth: parseFloat(((this.props.size.width - 14) / 7).toFixed(2), 10)
  };

  componentDidUpdate() {
    const { scrollProgress } = this.props;
    const listFullWidth = this.instance.scrollWidth;
    // TODO: write for year auto scroll function
    // if (mode === 'year') {
    //   return;
    // }
    this.instance.scrollLeft = listFullWidth * scrollProgress;
  }

  handleScrollTo = (date = undefined) => {
    const { onScrollProgress } = this.props;

    this.scrollList((date || new Date()), scrollLeft => {
      setTimeout(() => {
        const scrollProgress = scrollLeft / this.instance.scrollWidth;

        return onScrollProgress(scrollProgress);
      }, 0);
    });
  };

  scrollList = (date, callback = () => undefined) => {
    const { mode, size } = this.props;
    const { monthlyDayWidth, weeklyDayWidth } = this.state;
    const thisYear = date.getFullYear();

    //  if there is no data ref or th list was scrolled
    if (!this[`year_${thisYear}`] || !date) return;

    //  if this year have rendered
    const thisYearDOM = this[`year_${thisYear}`].domEl;
    const thisYearInitialX = thisYearDOM.offsetLeft;
    let result;

    if (mode === 'year') {
      const thisMonth = date.getMonth();

      const yearWidth = thisYearDOM.clientWidth;
      const monthWidth = yearWidth / 12;

      result = (thisYearInitialX + ((thisMonth + 0.5) * monthWidth))
        - (size.width / 2);
    } else {
      const thisYearStart = new Date(thisYear, 0, 0);
      const diff = date - thisYearStart;
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const dayWidth = mode === 'week' ? (weeklyDayWidth + 2) : (monthlyDayWidth + 2);

      result = (thisYearInitialX + (dayOfYear * dayWidth))
        - ((size.width / 2) + (1.5 * dayWidth));
    }

    this.instance.scrollLeft = result;
    return this.setState({ date }, callback(result));
  };

  handleScroll = () => {
    const { date, lastDate } = this.state;
    const { onScrollProgress } = this.props;

    const listFullWidth = this.instance.scrollWidth;
    const scrollProgress = this.instance.scrollLeft / listFullWidth;

    if (date !== lastDate) {
      onScrollProgress(scrollProgress);
    }
  };

  onMouseWheel = e => {
    const listFullWidth = this.instance.scrollWidth;
    const { scrollProgress } = this.props;
    this.instance.scrollLeft = (listFullWidth * scrollProgress) + e.deltaY;
  };

  handleEventButtonClick = (date, mode) => {
    const { changeScale } = this.props;

    changeScale(mode, () => this.setState({ lastDate: this.state.date }, () => (
      this.handleScrollTo(date)
    )));
  };

  renderContent = () => {
    const { games, mode } = this.props;
    const { monthlyDayWidth, weeklyDayWidth } = this.state;

    if (games === null) return <div />;

    const years = Object.keys(games);
    if (!years) return <div className={[styles.Year, styles.EmptyYear].join(' ')}>There is no info</div>;

    const buildedRows = _.keysIn(this.state).filter(k => {
      const pos = k.indexOf('event_rows->');
      return pos >= 0 ? k.substr(0, pos + 12) : false;
    }).map(k => this.state[k]);

    //  16.67 ms -> 60fps
    // setTimeout(this.handleScrollToDefault, 8.34);

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
        getEventRows={(key, rows) => {
         this.setState({ [`event_rows->${key}`]: rows });
        }}
        scrollTo={this.handleScrollTo}
        onEventButtonClick={this.handleEventButtonClick}
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
