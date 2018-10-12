import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import styles from './Select.css';
import { Spinner } from './..';

const Select = ({ options, active = options[0], onClick }) => (
  <div className={styles.Wrapper}>
    <div className={styles.Preview}>
      {active !== null ? active : <Spinner />}
    </div>
    <div className={styles.List}>
      <ul>
        {
          options
            .map(item => (
              <li
                key={v4()}
                onClick={() => onClick(item)}
                onKeyPress={undefined}
                role="button"
                tabIndex="0"
              >
                {item}
              </li>
            ))
        }
      </ul>
    </div>
  </div>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func
};

Select.defaultProps = {
  active: undefined,
  onClick: () => undefined
};

export { Select };
