import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { MONTH_NAMES } from './../../utils/const';
import Header from './../../components/Header/Header';
import List from './../../components/List/List';

// import styles from './Homepage.css';

class Homepage extends Component {
  state = {
    today: undefined,
    year: undefined,
    month: undefined,
    mode: 'week',
    games: [
      { id: 0, title: '0', startDate: 1534936707, endDate: 1534944552 },
      { id: 1, title: '1', startDate: 1534944552, endDate: 1535714306 },
      { id: 2, title: '2', startDate: 1534936707, endDate: 1535714306 },
      { id: 3, title: '3', startDate: 1535357118, endDate: 1535360681 }
    ]
  };

  componentWillMount() {
    // const date = new Date();
    // const y = date.getFullYear();
    // const m = date.getMonth();
    // this.setState({
    //   timePeriods: {
    //     previous: {
    //       start: new Date(y, m > 0 ? m - 1 : 11, 1),
    //       end: new Date(y, m, 0)
    //     },
    //     now: {
    //       start: new Date(y, m, 1),
    //       end: new Date(y, m < 11 ? m + 1 : 0, 0)
    //     },
    //     next: {
    //       start: new Date(y, m < 11 ? m + 1 : 0, 1),
    //       end: new Date(y, m < 10 ? m + 2 : 0, 0)
    //     }
    //   }
    // });
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // const daysOfYear = () => (isLeapYear() ? 366 : 365);
    //
    // const isLeapYear = () => year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    //
    // const dayOfTheYear = () => {
    //   const start = new Date(year, 0, 0);
    //   const diff = today - start;
    //   const oneDay = 1000 * 60 * 60 * 24;
    //   return Math.floor(diff / oneDay);
    // };

    this.setState({ today, year, month });
  }

  handleChangeMode = mode => this.setState({ mode });

  render() {
    const { today, mode, year, month, games } = this.state;

    return (
      <div>
        <Header year={year} month={MONTH_NAMES[month]} changeMode={this.handleChangeMode} />
        <List {...{ today, mode, year, month, games }} />
      </div>
    );
  }
}

export default Homepage;
