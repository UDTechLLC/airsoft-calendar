import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import styles from './Content.css';
import { Button, Spinner, Unit, Container } from './../common';
import Events from './../Events/Events';
import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import { getNumberOfDays, getDayOfWeek, getEvents } from './../../utils/utils';

const Content = ({ games, loading, mode, focusDate, changeFocusDateTo }) => {
  const focusYear = focusDate.getFullYear();
  const focusMonth = focusDate.getMonth();
  const focusDay = focusDate.getDate();

  if (games === null || loading) {
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
              onClick={() => changeFocusDateTo(new Date(focusYear, month))}
              className="Event"
            >
              {events.length}
            </Button>
          </Unit>
        );
      });
    }

    if (mode === 'month') {
      const from = { year: focusYear, month: focusMonth, date: 1 };
      const to = {
        year: focusYear,
        month: focusMonth !== 11 ? focusMonth + 1 : 0,
        date: 0
      };

      return (
        <Container row>
          {renderDays()}
          <Events
            games={getEvents(games, from, to)}
            from={from}
            mode={mode}
          />
        </Container>
      );
    }

    const from = {
      year: focusYear,
      month: focusMonth,
      date: focusDay - 3
    };
    const to = {
      year: focusYear,
      month: focusMonth,
      date: focusDay + 3
    };

    return (
      <Container row>
        {renderDays()}
        <Events
          games={getEvents(games, from, to)}
          from={from}
        />
      </Container>
    );
  };

  const renderDays = () => {
    const daysNumber = mode !== 'month' ? 7 : 31;
    const daysInMonth = getNumberOfDays(focusYear, focusMonth);

    const getData = (y, m, d) => {
      const updDate = d <= daysInMonth ? d + 1 : (d - daysInMonth) + 1;

      if (mode === 'month') {
        const label = DAY_NAMES[getDayOfWeek(focusYear, focusMonth, d + 1)].substr(0, 3);
        return {
          updDate,
          updMonth: d <= daysInMonth ? focusMonth : m,
          updYear: d <= daysInMonth ? focusYear : y,
          label
        };
      }

      const label = DAY_NAMES[getDayOfWeek(focusYear, focusMonth, (focusDay - 3) + d)];
      return {
        updDate: (focusDay - 3) + d,
        updMonth: d <= daysInMonth ? focusMonth : m,
        updYear: d <= daysInMonth ? focusYear : y,
        label
      };
    };

    return Array.apply([], Array(daysNumber)).map((v, d) => {
      // case if newxt month will break year point
      const prepMonth = focusMonth < 11 && d <= daysInMonth ? focusMonth + 1 : 0;
      const prepYear = prepMonth !== 0 && d <= daysInMonth ? focusYear : focusYear + 1;
      const { updDate, updMonth, updYear, label } = getData(prepYear, prepMonth, d);

      return (
        <Unit key={uuidv4()} label={label}>
          {new Date(updYear, updMonth, updDate).getDate()}
        </Unit>
      );
    });
  };

  return (
    <div className={styles.Wrapper}>
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
  changeFocusDateTo: PropTypes.func.isRequired
};

Content.defaultProps = {
  games: {}
};

export default Content;
