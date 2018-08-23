import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../utils/utils';

const initialState = {
  data: undefined,
  error: null,
  loading: false
};

const actionStart = state => updateObject(state, { loading: true });

const actionFail = (state, { payload }) => updateObject(state, {
  error: payload.error,
  loading: false
});

const actionSuccess = (state, { payload }) => updateObject(state, {
  data: payload.data,
  error: null,
  loading: false
});

const reducer = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      //  start actions
      case actionTypes.EXAMPLE_START:
        return actionStart(state, action);
      //  fail actions
      case actionTypes.EXAMPLE_FAIL:
        return actionFail(state, action);
      //  success actions
      case actionTypes.EXAMPLE_SUCCESS:
        return actionSuccess(state, action);
      default:
        return state;
    }
  }

  return state;
};

export default reducer;
