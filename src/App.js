import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
// const AsyncCart = AsyncComponent(() => import('./containers/Example/Example'));

class App extends Component {
  renderRoutes = () => (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );

  render() {
    return <Layout>{this.renderRoutes()}</Layout>;
  }
}

// const mapStateToProps = state => ({
//   isAuth: state.auth.authKey !== null
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     initApp: () => dispatch(getLocationInfo()),
//     onTryAutoSignup: () => dispatch(authCheckState())
//   }
// };

export default withRouter(connect(null, null)(App));
