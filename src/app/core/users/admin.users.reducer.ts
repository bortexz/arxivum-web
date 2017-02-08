import { AdminUsersState } from './admin.users.reducer';
import { UsersActions } from './users.actions';
import { IUser } from './users.interfaces';

export interface AdminUsersState {
  users: IUser[];
  users_error: Error;
}

const initialState: AdminUsersState = {
  users: null,
  users_error: null
};

export function adminUsersReducer (state = initialState, action): AdminUsersState {
  switch (action.type) {
    case UsersActions.GET_USERS:
    case UsersActions.GET_USERS_SUCCESS: {
      return {
        users: action.payload.users,
        users_error: null
      };
    }
    case UsersActions.GET_USERS_ERROR: {
      return {
        users: null,
        users_error: action.payload.error
      };
    }
  }
  return state;
}
