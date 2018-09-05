import axios from 'axios';

import * as actionTypes from './actionTypes';

const getGamesStart = () => ({ type: actionTypes.GET_GAMES_START });

const getGamesSuccess = data => ({
  type: actionTypes.GET_GAMES_SUCCESS,
  payload: { ...data }
});

const getGamesFail = error => ({
  type: actionTypes.GET_GAMES_FAIL,
  payload: { error }
});

const getGames = (year = undefined) => dispatch => {
  dispatch(getGamesStart());

  const route = year
    ? `https://stage.airsoftorg.com/api/web/v1/game/calendar/${year}`
    : 'https://stage.airsoftorg.com/api/web/v1/game/calendar';

  axios.get(route)
    .then(({ data }) => dispatch(getGamesSuccess(data)))
    .catch(({ response }) => dispatch(getGamesFail(response.message)));
};

export { getGames };
