import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import uuidv4 from 'uuid/v4';

import styles from './Content.css';
import { Button, Spinner, Unit } from './../common';
import { MONTH_NAMES, DAY_NAMES } from './../../utils/const';
import { getNumberOfDays, getDayOfWeek } from './../../utils/utils';

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
          const timestamp = {
            start: new Date(focusYear, month, 1).getTime(),
            end: new Date(focusYear, month + 1, 0).getTime()
          };
          const events = _.filter(games[focusYear], o => (
            o.date_start >= (timestamp.start / 1000) && o.date_start <= (timestamp.end / 1000)
          ));

          if (!events.length) return <Unit label={MONTH_NAMES[month]} />;

          return (
            <Unit key={uuidv4()} label={MONTH_NAMES[month]}>
              <Button onClick={() => console.log(new Date(focusYear, month))}>
                {events.length}
              </Button>
            </Unit>
          );
        });
      case 'month':
        return Array.apply([], Array(getNumberOfDays(focusYear, focusMonth))).map((v, d) => {
          const dayOfWeek = getDayOfWeek(focusYear, focusMonth, d + 1);
          return (
            <Unit
              key={uuidv4()}
              label={DAY_NAMES[dayOfWeek].substr(0, 3)}
            >
              {d + 1}
            </Unit>
          );
        });
      default:
        return Array.apply([], Array(7)).map((v, d) => {
          const dayOfWeek = getDayOfWeek(focusYear, focusMonth, (focusDay - 3) + d);
          return (
            <Unit
              key={uuidv4()}
              label={DAY_NAMES[dayOfWeek].substr(0, 3)}
            >
              {(focusDay - 3) + d}
            </Unit>
          );
        });
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
