import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './EventButton.css';

class EventButton extends Component {
  // componentWillMount() { this.props.scrollTo(); }

  render() {
    const { mode, games, onEventButtonClick, eventRows, year, month } = this.props;

    const timestamp = {
      start: new Date(year, month, 1).getTime(),
      end: new Date(year, month + 1, 0).getTime()
    };

    let content;
    if (mode === 'year') {
      const events = _.filter(games, o => (
        o.date_start >= (timestamp.start / 1000) && o.date_start <= (timestamp.end / 1000)
      ));

      if (events.length) {
        content = (
          <div className={styles.EventCircle}>
            {events.length}
          </div>
        );
      }
    }

    return (
      <button
        type="button"
        className={styles.MonthCircleWrapper}
        style={{ height: !eventRows ? 58 : eventRows * 27 }}
        onClick={() => onEventButtonClick(new Date(year, month), mode === 'year' ? 'month' : 'week')}
      >
        {content}
      </button>
    );
  }
}

EventButton.propTypes = {
  mode: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onEventButtonClick: PropTypes.func.isRequired,
  eventRows: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  // scrollTo: PropTypes.func.isRequired
};

export default EventButton;
