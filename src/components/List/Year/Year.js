import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import uuidv4 from 'uuid/v4';

import { getNumberOfDays, getDaysOfYear } from './../../../utils/utils';
import Month from './../Month/Month';
import Day from './../Day/Day';
import Events from './../Events/Events';
import EventButton from './../EventButton/EventButton';

import styles from './Year.css';

class Year extends Component {
  state = { yearLabelId: uuidv4() };

  componentDidMount() {
    this.props.scrollTo();
    const { year, detectYearsCoords } = this.props;
    const { yearLabelId } = this.state;

    detectYearsCoords({
      year,
      start: this[yearLabelId].offsetLeft,
      end: this[yearLabelId].offsetLeft + this[yearLabelId].offsetWidth
    });
  }

  // centerMe = () => {
  //   const { caseMiddle } = this.props;
  //   const { yearLabelId } = this.state;
  //   const ref = this[yearLabelId];
  //
  //   // if (!containerObj || !parentObj.domEl || !ref || !ref.children.length) return;
  //   //
  //   // const container = containerObj;
  //   // const parent = parentObj.domEl;
  //   //
  //   // const result = container.scrollLeft >= parent.offsetLeft + (container.offsetWidth / 2) ||
  //   //   container.scrollLeft <= (parent.offsetLeft + parent.offsetWidth) -
  //   //     (container.offsetWidth / 2) ?
  //   //   (container.scrollLeft - parent.offsetLeft) + (container.offsetWidth / 2)
  //   //   : 0;
  //   if (!caseMiddle || !ref || !ref.children.length) return 0;
  //   console.log(caseMiddle);
  //   return caseMiddle;
  //
  //
  //   // const result = containerObj.domEl.offsetLeft +
  //   //   ((containerWidth / 2) - (ref.children[0].scrollWidth / 2));
  //   // console.log(containerScrollLeft.domEl.offsetLeft);
  //   // console.log(result);
  //   // return result;
  // };

  renderMonths = () => Array.apply([], Array(12)).map((v, month) => this.renderMonth(month));

  renderMonth = month => {
    const { year, mode, games, eventRows, onEventButtonClick } = this.props;

    const button = (
      <EventButton
        mode={mode}
        games={games[year] ? games[year] : []}
        eventRows={eventRows}
        onEventButtonClick={onEventButtonClick}
        year={year}
        month={month}
        // scrollTo={scrollTo}
      />
    );

    let days;
    if (mode !== 'year') days = this.renderDays(month, button);

    return (
      <Month key={month} year={year} month={month} mode={mode}>
        {days || button}
      </Month>
    );
  };

  renderDays = (month, content = undefined) => {
    const {
      year,
      mode,
      monthlyDayWidth,
      weeklyDayWidth,
      eventRows
    } = this.props;

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
          <div className={styles.DateNumber}>{d + 1}</div>
          {content ? <div className={styles.DateContent}>{content}</div> : undefined}
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
    const { yearLabelId } = this.state;
    // this.centerMe();

    return (
      <div ref={el => { this[yearLabelId] = el; }} className={styles.Year}>
        <div>
          <span>{year}</span>
        </div>
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
  onEventButtonClick: PropTypes.func.isRequired,
  getEventRows: PropTypes.func.isRequired,
  detectYearsCoords: PropTypes.func.isRequired,
  scrollTo: PropTypes.func.isRequired,
  // containerObj: PropTypes.shape(),
  // parentObj: PropTypes.shape(),
  // caseMiddle: PropTypes.number
};

Year.defaultProps = {
  size: {},
  games: {},
  // containerObj: {},
  // parentObj: {}
  // caseMiddle: undefined
};

export default sizeMe()(Year);
