import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import styles from './Content.css';
import { Button, Spinner, Unit, Container } from './../common';
import Events from './../Events/Events';
import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import { getNumberOfDays, getDayOfWeek, getEvents } from './../../utils/utils';

const Content = ({ games, loading, mode, focusDate }) => {
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
    switch (mode) {
      case 'year':
        return Array.apply([], Array(12)).map((v, month) => {
          const from = { year: focusYear, month, date: 1 };
          const to = { year: focusYear, month: month + 1, date: 0 };
          const events = getEvents(games, from, to);

          if (!events.length) return <Unit key={uuidv4()} label={MONTH_NAMES[month]} />;

          return (
            <Unit key={uuidv4()} label={MONTH_NAMES[month]}>
              <Button onClick={() => console.log(new Date(focusYear, month))}>
                {events.length}
              </Button>
            </Unit>
          );
        });
      case 'month':
        return (
          <Container row>
            {
              Array.apply([], Array(getNumberOfDays(focusYear, focusMonth))).map((v, d) => {
                const dayOfWeek = getDayOfWeek(focusYear, focusMonth, d + 1);
                return (
                  <Unit
                    key={uuidv4()}
                    label={DAY_NAMES[dayOfWeek].substr(0, 3)}
                  >
                    {d + 1}
                  </Unit>
                );
              })
            }
            <Events
              games={getEvents(games, {
                year: focusYear,
                month: focusMonth,
                date: 1
              }, {
                year: focusYear,
                month: focusMonth !== 11 ? focusMonth + 1 : 0,
                date: 0
              })}
              from={{
                year: focusYear,
                month: focusMonth,
                date: 1
              }}
              mode={mode}
            />
          </Container>
        );
      default:
        return (
          <Container row>
            {
              Array.apply([], Array(7)).map((v, d) => {
                const dayOfWeek = getDayOfWeek(focusYear, focusMonth, (focusDay - 3) + d);
                return (
                  <Unit
                    key={uuidv4()}
                    label={DAY_NAMES[dayOfWeek].substr(0, 3)}
                  >
                    {(focusDay - 3) + d}
                  </Unit>
                );
              })

            }
            <Events
              games={getEvents(games, {
                year: focusYear,
                month: focusMonth,
                date: focusDay - 3
              }, {
                year: focusYear,
                month: focusMonth,
                date: focusDay + 3
              })}
              from={{
                year: focusYear,
                month: focusMonth,
                date: focusDay - 3
              }}
            />
          </Container>
        );
    }
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
  focusDate: PropTypes.instanceOf(Date).isRequired
};

Content.defaultProps = {
  games: {}
};

export default Content;
