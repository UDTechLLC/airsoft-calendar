import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

import * as actions from './store/actions';
import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
// const AsyncCart = AsyncComponent(() => import('./containers/Example/Example'));

class App extends Component {
  componentWillMount() {
    this.props.getGames();
  }

  render() {
    return (
      <Layout>
        <Homepage />
      </Layout>
    );
  }
}

App.propTypes = {
  getGames: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   isAuth: state.auth.authKey !== null
// });

const mapDispatchToProps = dispatch => ({
  getGames: () => dispatch(actions.getGames())
});

export default connect(null, mapDispatchToProps)(App);
