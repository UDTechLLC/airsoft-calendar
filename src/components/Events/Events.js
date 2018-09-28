import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import { splitEventsArray, splitLoop, getHoursFromTimestamps } from './../../utils/utils';
import EventObject from './EventObject/EventObject';

import styles from './Events.css';

class Events extends Component {
  renderContent = () => {
    const { games } = this.props;
    const { mode, from } = this.props;

    // check if there`s some coincidence
    let gamesArr = splitEventsArray(games);

    if (!gamesArr[1] || !gamesArr[1].length) {
      //  if there is no coincidence
      gamesArr.splice(1, 1);
    } else {
      //  if there's some coincidence - check coincidence array to the end
      gamesArr = splitLoop(gamesArr);
    }

    //  if there is no games
    if (!gamesArr[0].length) return undefined;

    const days = mode === 'month' ? 31 : 7;
    const hourWidth = 100 / days / 24;

    const firstDay = new Date(from.year, from.month, from.date).getTime() / 1000;

    return gamesArr.map(row => (
      <div
        key={uuidv4()}
        className={styles.EventsRow}
      >
        {row.map(event => (
          <EventObject
            key={event.id}
            event={event}
            style={{
              left: `${getHoursFromTimestamps(event.date_start, firstDay) * hourWidth}%`,
              width: `${getHoursFromTimestamps(event.date_end, event.date_start) * hourWidth}%`
            }}
          />
        ))}
      </div>
    ));
  };

  render() {
    return (
      <div className={styles.Events}>
        {this.renderContent()}
      </div>
    );
  }
}

Events.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  mode: PropTypes.string,
  from: PropTypes.shape().isRequired
};

Events.defaultProps = {
  mode: 'week'
};

export default Events;
