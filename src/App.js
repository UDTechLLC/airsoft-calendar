import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from './utils/const';
import { Container } from './components/common';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

class App extends Component {
  state = {
    location: undefined,
    games: null,
    error: null,
    loading: false,
    mode: 'year',
    focusDate: new Date()
  };

  componentWillMount() {
    this.handleFetchGames();
  }

  handleFetchGames = (year = undefined) => {
    const route = year ? `${API_URL}/${year}` : API_URL;
    const { games } = this.state;

    this.setState({ loading: true }, () => axios.get(route)
      .then(({ data }) => (
        this.setState({ games: { ...games, ...data.games }, loading: false }, () => {
          this.handleRemoveErrors();
        })
      ))
      .catch(({ response }) => this.setState({ error: response.message, loading: false })));
  };

  handleRemoveErrors = () => this.setState({ error: null, loading: false });

  handleChangeMode = (mode, cb = () => undefined) => {
    this.setState({ mode: mode || this.state.mode }, cb());
  };

  handleManipulationBtnClick = to => {
    const { focusDate, mode, games } = this.state;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();
    const date = focusDate.getDate();
    // TODO: check this
    if (to === 'prev' && mode === 'year') {
      return this.setState({ focusDate: new Date(year - 1, month, date) }, () => {
        if (!games[year - 1]) {
          this.handleFetchGames(year - 1);
        }
      });
    } else if (to === 'prev' && mode === 'month') {
      const updMonth = month !== 0 ? month - 1 : 11;
      const updYear = updMonth !== 11 ? year : year - 1;
      return this.setState({ focusDate: new Date(updYear, updMonth, date) }, () => {
        if (!games[updYear]) {
          this.handleFetchGames(updYear);
        }
      });
    } else if (to === 'prev' && mode === 'week') {
      const updFocusDate = new Date(+new Date(year, month, date) - (1000 * 60 * 60 * 24));
      return this.setState({ focusDate: updFocusDate }, () => {
        if (!games[updFocusDate.getFullYear()]) {
          this.handleFetchGames(updFocusDate.getFullYear());
        }
      });
    } else if (to === 'next' && mode === 'year') {
      return this.setState({ focusDate: new Date(year + 1, month, date) }, () => {
        if (!games[year - 1]) {
          this.handleFetchGames(year + 1);
        }
      });
    } else if (to === 'next' && mode === 'month') {
      const updMonth = month !== 11 ? month + 1 : 0;
      const updYear = updMonth !== 0 ? year : year + 1;
      return this.setState({ focusDate: new Date(updYear, updMonth, date) }, () => {
        if (!games[updYear]) {
          this.handleFetchGames(updYear);
        }
      });
    } else if (to === 'next' && mode === 'week') {
      const updFocusDate = new Date(+new Date(year, month, date) + (1000 * 60 * 60 * 24));
      return this.setState({ focusDate: updFocusDate }, () => {
        if (!games[updFocusDate.getFullYear()]) {
          this.handleFetchGames(updFocusDate.getFullYear());
        }
      });
    }
  };

  handleChangeFocusDateTo = focusDate => this.setState({ focusDate, mode: 'month' })

  render() {
    const { mode } = this.state;

    return (
      <Container>
        <Header
          mode={mode}
          changeMode={this.handleChangeMode}
          onManipulationClick={to => this.handleManipulationBtnClick(to)}
        />
        <Content
          {...this.state}
          changeFocusDateTo={this.handleChangeFocusDateTo}
        />
      </Container>
    );
  }
}

export default App;
