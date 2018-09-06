import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './../../components/Header/Header';
import List from './../../components/List/List';

class Homepage extends Component {
  state = {
    mode: 'week',
    scrollProgress: undefined
  };

  handleChangeMode = (mode, cb = () => undefined) => {
    this.setState({ mode: mode || this.state.mode }, cb());
  };

  handleCheckScrollProgress = scrollProgress => {
    const { games } = this.props;

    if (!games || !Object.keys(games).length) return;
    // console.log('scrollProgress');
    this.setState({ scrollProgress });
  };

  render() {
    const { games } = this.props;
    const { mode, scrollProgress } = this.state;

    return (
      <div>
        <Header mode={mode} changeMode={this.handleChangeMode} />
        <List
          mode={mode}
          scrollProgress={scrollProgress}
          games={games}
          changeScale={this.handleChangeMode}
          onScrollProgress={this.handleCheckScrollProgress}
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
  games: state.data.games
});

export default connect(mapStateToProps)(Homepage);
