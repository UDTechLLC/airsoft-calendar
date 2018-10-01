import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { API_URL } from './utils/const';
import { filterGames } from './utils/utils';
import { Container } from './components/common';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

class App extends Component {
  state = {
    isMobile: window.innerWidth < 768,
    games: null,
    userData: null,
    error: null,
    loading: false,
    mode: 'month',
    filter: null,
    focusDate: new Date()
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    this.handleFetchGames(null, () => this.handleFetchUserData(() => {
      this.setState({ loading: false });
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ isMobile: window.innerWidth < 768 });
  };

  handleFetchGames = (year = undefined, cb = () => undefined) => {
    this.setState({ loading: true });

    const route = year ? `${API_URL}/game/calendar/${year}` : `${API_URL}/game/calendar`;
    const { games } = this.state;

    return axios.get(route)
      .then(({ data }) => (
        this.setState({ games: { ...games, ...data.games } }, () => {
          if (!year) return cb();

          this.setState({ loading: false }, () => cb());
        })
      ))
      .catch(({ response }) => this.setState({ error: response.message }, () => cb()));
  };

  handleFetchUserData = (cb = () => undefined) => {
    const id = localStorage.getItem('airsoft-user-unique-id');

    if (!id) return this.setState({ filter: 'world' }, () => cb());

    return axios.get(`${API_URL}/user/get-place/${id}`)
      .then(({ data }) => this.setState({ userData: data, filter: 'region' }, () => cb()))
      .catch(({ response }) => this.setState({ error: response.message }, () => cb()));
  }

  handleRemoveErrors = () => this.setState({ error: null, loading: false });

  handleChangeMode = (mode, cb = () => undefined) => {
    this.setState({ mode: mode || this.state.mode }, cb());
  };

  handleManipulationBtnClick = to => {
    const { focusDate, mode, games } = this.state;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();
    const date = focusDate.getDate();

    if (to === 'prev' && mode === 'year') {
      return this.setState({ focusDate: new Date(year - 1, month, date) }, () => {
        if (!games[year - 1]) {
          this.handleFetchGames(year - 1);
        }
      });
    } else if (to === 'prev') {
      const updFocusDate = new Date(+focusDate - (1000 * 60 * 60 * 24));
      return this.setState({ focusDate: updFocusDate }, () => {
        if (!games[updFocusDate.getFullYear()]) {
          this.handleFetchGames(updFocusDate.getFullYear());
        }
      });
    } else if (to === 'next' && mode === 'year') {
      return this.setState({ focusDate: new Date(year + 1, month, date) }, () => {
        if (!games[year + 1]) {
          this.handleFetchGames(year + 1);
        }
      });
    } else if (to === 'next') {
      const updFocusDate = new Date(+focusDate + (1000 * 60 * 60 * 24));
      return this.setState({ focusDate: updFocusDate }, () => {
        if (!games[updFocusDate.getFullYear()]) {
          this.handleFetchGames(updFocusDate.getFullYear());
        }
      });
    }
  };
  throttleManipulation = _.throttle(
    to => this.handleManipulationBtnClick(to),
    1080
  );

  handleChangeFocusDateTo = (focusDate, mode = 'month') => this.setState({ focusDate, mode })

  handleScrollInstance = e => {
    e.preventDefault(); e.stopPropagation();
    const { mode, focusDate } = this.state;

    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (mode === 'year') return this.throttleManipulation(delta < 0 ? 'prev' : 'next');

    const inc = mode === 'month' ? 2 : 4;
    const daysFloat = Math.abs(delta) <= 10 ? delta / inc : delta / 100 / inc;
    const date = focusDate.getDate() + parseInt(daysFloat, 10);

    this.setState({ focusDate: new Date(focusDate.getFullYear(), focusDate.getMonth(), date) });
  }

  render() {
    const { mode, games, error, userData, filter } = this.state;
    if (error) console.log(error);

    return (
      <Container>
        <Header
          filter={filter}
          mode={mode}
          changeMode={this.handleChangeMode}
          onManipulationClick={to => this.handleManipulationBtnClick(to)}
          onChangeFilter={f => this.setState({ filter: f })}
        />
        <Content
          {...this.state}
          games={filterGames(games, filter, userData)}
          changeFocusDateTo={this.handleChangeFocusDateTo}
          onScroll={e => this.handleScrollInstance(e)}
        />
      </Container>
    );
  }
}

export default App;
