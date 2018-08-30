import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { MONTH_NAMES } from './../../utils/const';
import Header from './../../components/Header/Header';
import List from './../../components/List/List';

// import styles from './Homepage.css';

class Homepage extends Component {
  state = {
    // today: undefined,
    year: undefined,
    month: undefined,
    visualMonth: undefined,
    mode: 'year'
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

  handleChangeVisualMonth = visualMonth => this.setState({ visualMonth });

  render() {
    const { games } = this.props;
    const { mode, year, month, visualMonth } = this.state;
    // console.log(games);

    return (
      <div>
        <Header
          changeMode={this.handleChangeMode}
          month={_.isNumber(visualMonth) ? MONTH_NAMES[visualMonth] : MONTH_NAMES[month]}
          {...{ mode, year }}
        />
        <List
          changeScale={this.handleChangeTimeScale}
          changeVisualMonth={this.handleChangeVisualMonth}
          games={games}
          {...{ mode, year, month }}
        />
      </div>
    );
  }
}

Homepage.propTypes = {
  games: PropTypes.shape()
};

Homepage.defaultProps = {
  games: null
};

const mapStateToProps = state => ({
  games: state.games.games
});

export default connect(mapStateToProps)(Homepage);
