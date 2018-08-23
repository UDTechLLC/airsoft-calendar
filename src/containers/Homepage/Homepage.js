import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import ListContainer from './../../components/ListContainer/ListContainer';

// import styles from './Homepage.css';

class Homepage extends Component {
  state = {
    today: undefined,
    mode: 'year',
    games: [
      { id: 0, title: '0', startDate: 1534936707, endDate: 1534944552 },
      { id: 1, title: '1', startDate: 1534944552, endDate: 1535714306 },
      { id: 2, title: '2', startDate: 1534936707, endDate: 1535714306 }
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
    this.setState({ today: new Date() });
  }

  handleChangeMode = mode => this.setState({ mode });

  render() {
    const { today, mode, games } = this.state;

    return (
      <div>
        <ListContainer
          today={today}
          mode={mode}
          changeMode={this.handleChangeMode}
          games={games}
        />
      </div>
    );
  }
}

export default Homepage;
