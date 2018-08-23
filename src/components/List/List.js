import React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';
// import LazyLoading from 'react-list-lazy-load';

import styles from './List.css';

const List = ({ length, initialIndex }) => {
  const renderItem = (index, key) => (
    <div key={key} style={{ width: 100 }}>
      {index + 1}
    </div>
  );

  return (
    <div className={styles.Wrapper}>
      <ReactList
        axis="x"
        initialIndex={initialIndex}
        length={length}
        itemRenderer={renderItem}
      />
    </div>
  );
};

List.propTypes = {
  length: PropTypes.number.isRequired,
  initialIndex: PropTypes.number.isRequired,
};

export default List;
