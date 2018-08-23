import React from 'react';
import PropTypes from 'prop-types';
// import ReactList from 'react-list';
// import LazyLoading from 'react-list-lazy-load';

import Header from './../Header/Header';
import List from './../List/List';


const ListContainer = ({ today, changeMode, /* games */ }) => {
  const year = today.getFullYear();

  const daysOfYear = () => (isLeapYear() ? 366 : 365);

  const isLeapYear = () => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

  const dayOfTheYear = () => {
    const start = new Date(year, 0, 0);
    const diff = today - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  return (
    <div>
      <Header month="example" changeMode={changeMode} />
      <List length={daysOfYear()} initialIndex={dayOfTheYear()} />;
    </div>
  );
};

ListContainer.propTypes = {
  today: PropTypes.instanceOf(Date).isRequired,
  changeMode: PropTypes.func.isRequired,
  // games: PropTypes.arrayOf(PropTypes.shape())
};

// ListContainer.defaultProps = {
//   games: []
// };

export default ListContainer;
