import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import styles from './Select.css';

const Select = ({ options, active = options[0], onClick, placeholder }) => (
  <div className={styles.Wrapper}>
    <div className={styles.Preview}>
      {active !== null ? active : placeholder}
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
                {item || placeholder}
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
  onClick: PropTypes.func,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  active: undefined,
  onClick: () => undefined,
  placeholder: 'Select one'
};

export { Select };
