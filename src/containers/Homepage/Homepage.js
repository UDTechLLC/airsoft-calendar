import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { MONTH_NAMES } from './../../utils/const';
import Header from './../../components/Header/Header';
import List from './../../components/List/List';

// import styles from './Homepage.css';

class Homepage extends Component {
  state = {
    // today: undefined,
    year: undefined,
    month: undefined,
    mode: 'week',
    games: [
      { id: 0, title: '0', startDate: 1534936707, endDate: 1535114552 },
      { id: 1, title: '1', startDate: 1535054552, endDate: 1535554306 },
      { id: 2, title: '2', startDate: 1534936707, endDate: 1535714306 },
      { id: 3, title: '3', startDate: 1535357118, endDate: 1535380681 }
    ]
  };

  componentWillMount() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    this.setState({ year, month });
  }

  handleChangeMode = mode => this.setState({ mode });

  handleChangeTimeScale = (year, month, mode = undefined) => this.setState({
    year,
    month,
    mode: !mode ? this.state.mode : mode
  });

  render() {
    const { mode, year, month, games } = this.state;

    return (
      <div>
        <Header year={year} month={MONTH_NAMES[month]} changeMode={this.handleChangeMode} />
        <List changeScale={this.handleChangeTimeScale} {...{ mode, year, month, games }} />
      </div>
    );
  }
}

export default Homepage;
