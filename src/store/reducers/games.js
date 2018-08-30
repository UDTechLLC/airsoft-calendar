import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../utils/utils';

const initialState = {
  games: null,
  error: null,
  loading: false
};

const actionStart = state => updateObject(state, { loading: true });

const actionFail = (state, { payload }) => updateObject(state, {
  error: payload.error,
  loading: false
});

const getGamesSuccess = (state, { payload }) => updateObject(state, {
  games: payload.games,
  error: null,
  loading: false
});

const reducer = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      //  start actions
      case actionTypes.GET_GAMES_START:
        return actionStart(state, action);
      //  fail actions
      case actionTypes.GET_GAMES_FAIL:
        return actionFail(state, action);
      //  success actions
      case actionTypes.GET_GAMES_SUCCESS:
        return getGamesSuccess(state, action);
      default:
        return state;
    }
  }

  return state;
};

export default reducer;
