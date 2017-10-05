import { APP_NOTIFICATION, REMOVE_NOTIFICATION } from './notifications.actions';
import { assign } from '../../utils/functional';
import { APP_ERROR, REMOVE_ERROR } from './errors.actions';
const R = require('ramda')

export interface CommonState {
  errors: any[];
  notifications: any[];
}

const initialState = {
  errors: [],
  notifications: []
}

export function commonReducer (state = initialState, action) {
  switch (action.type) {
    case APP_ERROR:
      return assign({ errors: R.append(action.message, state.errors) }, state)
    case APP_NOTIFICATION:
      return assign({ notifications: R.append(action.message, state.notifications) }, state)
    case REMOVE_ERROR:
      return assign({ errors: R.remove(action.index, 1, state.errors) }, state)
    case REMOVE_NOTIFICATION:
      return assign({ notifications: R.remove(action.index, 1, state.notifications) }, state)
  }
  return state
}
