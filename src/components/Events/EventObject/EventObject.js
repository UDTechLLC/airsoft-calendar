import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import uuidv4 from 'uuid/v4';
// import { withSize } from 'react-sizeme';

import styles from './EventObject.css';

const EventObject = ({ style, event, width }) => {
  const id = uuidv4();

  const getHM = timestamp => {
    const date = new Date(timestamp * 1000);
    const h = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const m = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${h}:${m}`;
  };

  const renderLine = () => {
    if (width >= 120) {
      return (
        <div className={styles.Content} data-tip data-for={id}>
          <span>{getHM(event.date_start)}</span>
          <span
            style={{
              margin: '0 1rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {event.name}
          </span>
          <span>{getHM(event.date_end)}</span>
        </div>
      );
    } else if (width >= 82) {
      return (
        <div className={styles.Content} data-tip data-for={id}>
          <span>{getHM(event.date_start)}</span>
          <span>{getHM(event.date_end)}</span>
        </div>
      );
    }

    return (
      <div className={styles.Content} data-tip data-for={id}>
        <span
          style={width > 40 ? {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          } : {
            opacity: 0
          }}
        >
          {event.name}
        </span>
      </div>
    );
  };

  return (
    <div
      className={styles.Wrapper}
      style={{ backgroundColor: '#dcc04a', ...style }}
    >
      {renderLine()}
      <ReactTooltip place="bottom" type="light" effect="float" id={id}>
        {Object.keys(event).map((k, i) => <p key={i}>{k}: {event[k]}</p>)}
      </ReactTooltip>
    </div>
  );
};

EventObject.propTypes = {
  style: PropTypes.shape(),
  event: PropTypes.shape(),
  width: PropTypes.number
};

EventObject.defaultProps = {
  style: {},
  event: {
    name: 'name',
    date_start: '00:00',
    date_end: '00:00',
  },
  width: null
};

export default EventObject;
