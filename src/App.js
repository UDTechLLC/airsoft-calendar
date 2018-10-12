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
    scale: 'week',
    filters: {},
    focusDate: new Date(),
    locations: {
      countries: [null],
      regions: [null],
      cities: [null]
    }
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
        this.setState({
          games: { ...games, ...data.games },
          locations: {
            countries: [null, ...data.countries],
            regions: [null, ...data.regions],
            cities: [null, ...data.cities]
          }
        }, () => {
          if (!year) return cb();

          this.setState({ loading: false }, () => cb());
        })
      ))
      .catch(({ response }) => this.setState({ error: response.message }, () => cb()));
  };

  handleFetchUserData = (cb = () => undefined) => {
    const id = localStorage.getItem('airsoft-user-unique-id');

    if (!id) return this.setState({ filters: {} }, () => cb());

    return axios.get(`${API_URL}/user/get-place/${id}`)
      .then(({ data }) => this.setState({
        userData: data,
        filters: {
          countries: data.country,
          regions: data.region,
          cities: data.city,
        }
      }, () => cb()))
      .catch(({ response }) => this.setState({ error: response.message }, () => cb()));
  }

  handleChangeFilter = (k, v) => {
    const { filters } = this.state;

    this.setState({ filters: { ...filters, [k]: v } });
  }

  handleRemoveErrors = () => this.setState({ error: null, loading: false });

  handleChangeScale = (scale, cb = () => undefined) => {
    this.setState({ scale: scale || this.state.scale }, cb());
  };

  handleManipulationBtnClick = to => {
    const { focusDate, scale, games } = this.state;
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();
    const date = focusDate.getDate();

    if (to === 'prev' && scale === 'year') {
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
    } else if (to === 'next' && scale === 'year') {
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

  handleChangeFocusDateTo = (focusDate, scale = 'month') => this.setState({ focusDate, scale })

  handleScrollInstance = e => {
    e.preventDefault(); e.stopPropagation();
    const { scale, focusDate } = this.state;

    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (scale === 'year') return this.throttleManipulation(delta < 0 ? 'prev' : 'next');

    const inc = scale === 'month' ? 2 : 4;
    const daysFloat = Math.abs(delta) <= 10 ? delta / inc : delta / 100 / inc;
    const date = focusDate.getDate() + parseInt(daysFloat, 10);

    this.setState({ focusDate: new Date(focusDate.getFullYear(), focusDate.getMonth(), date) });
  }

  render() {
    const { scale, games, error, filters, locations } = this.state;
    if (error) console.error(error);

    return (
      <Container>
        <Header
          filters={filters}
          scale={scale}
          changeScale={this.handleChangeScale}
          onChangeFilter={this.handleChangeFilter}
          locations={locations}
        />
        <Content
          {...this.state}
          games={filterGames(games, filters)}
          changeFocusDateTo={this.handleChangeFocusDateTo}
          onManipulationClick={to => this.handleManipulationBtnClick(to)}
          onScroll={e => this.handleScrollInstance(e)}
        />
      </Container>
    );
  }
}

export default App;
