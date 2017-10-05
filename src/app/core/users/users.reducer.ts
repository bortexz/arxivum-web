import { IUser } from './users.interfaces';
import { assign } from '../../utils/functional';
import { UPDATE_USERS_LIST } from './users.actions';

const R = require('ramda');

export type UsersState = IUser[];

const initialState = [];

export function usersReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERS_LIST: {
      return action.users;
    }
  }
  return state;
}
