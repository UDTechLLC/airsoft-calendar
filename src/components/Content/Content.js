import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import styles from './Content.css';
import { Button, Spinner, Unit, Container } from './../common';
import Events from './../Events/Events';
import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import { getNumberOfDays, getDayOfWeek, getEvents } from './../../utils/utils';

const Content = ({ games, loading, mode, focusDate, filter, changeFocusDateTo, onScroll }) => {
  const focusYear = focusDate.getFullYear();
  const focusMonth = focusDate.getMonth();
  const focusDay = focusDate.getDate();

  if (games === null || loading || !filter) {
    return (
      <div className={styles.Wrapper}>
        <Spinner />
      </div>
    );
  }

  const renderContent = () => {
    if (mode === 'year') {
      return Array.apply([], Array(12)).map((v, month) => {
        const from = { year: focusYear, month, date: 1 };
        const to = { year: focusYear, month: month + 1, date: 0 };
        const events = getEvents(games, from, to);

        if (!events.length) return <Unit key={uuidv4()} label={MONTH_NAMES[month]} />;

        return (
          <Unit key={uuidv4()} label={MONTH_NAMES[month]}>
            <Button
              onClick={() => changeFocusDateTo(new Date(focusYear, month, 16))}
              className="Event"
            >
              {events.length}
            </Button>
          </Unit>
        );
      });
    }

    const { days, from, to } = getDays();

    return (
      <Container row>
        {days}
        <Events games={getEvents(games, from, to, true)} from={from} mode={mode} />
      </Container>
    );
  };

  const getDays = () => {
    let from = { year: focusYear, month: focusMonth, date: 1 };
    let to = { year: focusYear, month: focusMonth !== 11 ? focusMonth + 1 : 0, date: 0 };

    const daysNumber = mode !== 'month' ? 7 : 31;
    const daysInMonth = getNumberOfDays(focusYear, focusMonth);

    const getData = (y, m, d) => {
      const updMonth = d <= daysInMonth ? focusMonth : m;
      const updYear = d <= daysInMonth ? focusYear : y;

      if (mode === 'month') {
        const dayOfWeek = getDayOfWeek(focusYear, focusMonth, (focusDay - 15) + d);
        const label = DAY_NAMES[dayOfWeek].substr(0, 3);

        return { updDate: (focusDay - 15) + d, updMonth, updYear, label, dayOfWeek };
      }

      const dayOfWeek = getDayOfWeek(focusYear, focusMonth, (focusDay - 3) + d);
      const label = DAY_NAMES[dayOfWeek];

      return { updDate: (focusDay - 3) + d, updMonth, updYear, label, dayOfWeek };
    };

    const days = Array.apply([], Array(daysNumber)).map((v, d) => {
      // case if newxt month will break year point
      const prepMonth = focusMonth === 11 && d >= daysInMonth ? 0 : focusMonth + 1;
      const prepYear = prepMonth === 0 && d >= daysInMonth ? focusYear + 1 : focusYear;

      const { updDate, updMonth, updYear, label, dayOfWeek } = getData(prepYear, prepMonth, d);

      // detect start and final dots
      if (d === 0) {
        from = { year: updYear, month: updMonth, date: updDate };
      } else if (d + 1 === daysNumber) {
        to = { year: updYear, month: updMonth, date: updDate };
      }

      return (
        <Unit
          key={uuidv4()}
          label={label}
          weekend={dayOfWeek === 0 || dayOfWeek === 6}
          onClick={() => (
            mode === 'month'
              ? changeFocusDateTo(new Date(updYear, updMonth, updDate), 'week')
              : undefined
          )}
        >
          {new Date(updYear, updMonth, updDate).getDate()}
        </Unit>
      );
    });

    return { days, from, to };
  };

  return (
    <div className={styles.Wrapper} onWheel={onScroll}>
      <Unit label={mode !== 'year' ? `${MONTH_NAMES[focusMonth]}, ${focusYear}` : focusYear}>
        {renderContent()}
      </Unit>
    </div>
  );
};

Content.propTypes = {
  games: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  focusDate: PropTypes.instanceOf(Date).isRequired,
  changeFocusDateTo: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onScroll: PropTypes.func
};

Content.defaultProps = {
  games: {},
  filter: null,
  onScroll: () => undefined
};

export default Content;
