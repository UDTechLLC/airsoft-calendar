import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import _ from 'lodash';

import { getDaysOfYear, getNumberOfDays } from './../../utils/utils';
import Year from './Year/Year';

import styles from './List.css';

class List extends Component {
  state = {
    date: new Date(),
    lastDate: undefined,
    monthlyDayWidth: parseFloat(((this.props.size.width - 62) / 31).toFixed(2), 10),
    weeklyDayWidth: parseFloat(((this.props.size.width - 14) / 7).toFixed(2), 10),
    yearsCoords: [],
    yearsCoordsCache: undefined,
  };

  componentDidUpdate() {
    const { /* size, mode, */ scrollProgress } = this.props;
    const listFullWidth = this.instance.scrollWidth;
    // TODO: write for year auto scroll function
    // if (mode === 'year') {
    //   this.instance.scrollLeft = (listFullWidth * scrollProgress) - (size.width / 2);
    //   // console.log((listFullWidth * scrollProgress) - (size.width / 2), size.width);
    //   return;
    // }
    // console.log('modes', scrollProgress);
    this.instance.scrollLeft = listFullWidth * scrollProgress;
  }

  handleScrollTo = (date = undefined) => {
    const { onScrollProgress } = this.props;
    // console.log('handleScrollTo');

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
    // console.log('handleScroll');

    const listFullWidth = this.instance.scrollWidth;
    const scrollProgress = this.instance.scrollLeft / listFullWidth;

    if (date !== lastDate) {
      // console.log('handleScroll for sure');
      onScrollProgress(scrollProgress);
    }
  };

  detectCenterScroll = () => {
    const { games, size } = this.props;
    const container = this.instance;
    const years = games ? Object.keys(games) : undefined;

    if (!container || !years) return;
    return container.scrollLeft + (size.width / 2);
  };

  detectYearsCoords = data => {
    const { yearsCoords } = this.state;
    yearsCoords.push(data);
    this.setState({ yearsCoords });
  };

  detectYear = coords => {
    const { mode } = this.props;
    const { yearsCoords } = this.state;

    const yearData = yearsCoords.length ?
      _.find(yearsCoords, o => o.start <= coords && o.end >= coords) :
      undefined;
    if (!yearData) return undefined;

    const monthsCoords = Array.apply([], Array(12)).map((u, i) => {
      if (mode !== 'year') {
        const del = getDaysOfYear(yearData.year);
        const thisYearStart = new Date(yearData.year, 0, 0);

        const st = new Date(yearData.year, i);
        const stDiff = st - thisYearStart;
        const end = i < 11 ? new Date(yearData.year, i + 1) : new Date(yearData.year + 1, 0);
        const endDiff = end - thisYearStart;

        const oneDay = 1000 * 60 * 60 * 24;

        const stMult = Math.floor(stDiff / oneDay) - 1;
        const endMult = Math.floor(endDiff / oneDay) - 1;

        return {
          month: i,
          start: (((yearData.end - yearData.start) / del) * stMult) + yearData.start,
          end: (((yearData.end - yearData.start) / del) * endMult) + yearData.start
        };
      }

      return {
        month: i,
        start: (((yearData.end - yearData.start) / 12) * i) + yearData.start,
        end: (((yearData.end - yearData.start) / 12) * (i + 1)) + yearData.start
      };
    });

    const monthData = monthsCoords.length ?
      _.find(monthsCoords, o => o.start <= coords && o.end >= coords) :
      undefined;
    if (!monthData) return new Date(yearData.year);

    const num = getNumberOfDays(yearData.year, monthData.month);

    const daysCoords = Array.apply([], Array(num)).map((u, i) => ({
      day: i,
      start: (((monthData.end - monthData.start) / num) * i) + monthData.start + (num * i),
      end: (((monthData.end - monthData.start) / num) * (i + 1)) + monthData.start + (num * i)
    }));
    // console.log(coords, yearsCoords, monthsCoords, daysCoords);
    const daysData = daysCoords.length ?
      _.find(daysCoords, o => o.start <= coords && o.end >= coords) :
      undefined;
    if (!daysData) return new Date(yearData.year, monthData.month);

    return new Date(yearData.year, monthData.month, daysData.day);
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

    // eslint-disable-next-line arrow-body-style
    return years.map((year, i) => {
      // const container = this.instance;
      // const thisObj = this[`year_${year}`];
      // const thisDom = thisObj ? thisObj.domEl : undefined;
      // const getMiddle = thisDom && (container.scrollLeft >= thisDom.offsetLeft +
      //   (container.offsetWidth / 2) ||
      //   container.scrollLeft <= (thisDom.offsetLeft + thisDom.offsetWidth) -
      //   (container.offsetWidth / 2)) ?
      //   (container.scrollLeft - thisDom.offsetLeft) + (container.offsetWidth / 2)
      //   : undefined;
      // const caseMiddle = thisObj && thisDom &&
      // (thisDom.scrollLeft >= thisDom.offsetLeft ||
      //   this.instance.scrollLeft <= thisDom.offsetLeft + thisDom.offseWidth) ?
      //   getMiddle :
      //   undefined;


      return (
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
          detectYearsCoords={this.detectYearsCoords}
        />
      );
    });
  };

  render() {
    console.log(this.detectYear(this.detectCenterScroll()));
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
