import { AuthenticationActions } from '../authentication/authentication.actions';
import { UsersActions } from './users.actions';
export interface IRegisterData {
  email: string;
  password: string;
}

export interface UsersState {
  register: IRegisterData;
  register_error: Error;
  // users: [] -> later
};

const initialState: UsersState = {
  register: null,
  register_error: null
};

export function usersReducer (state = initialState, action): UsersState {
  switch (action.type) {
    case UsersActions.REGISTER: {
      const {email, password} = action.payload;
      return {
        register: {email, password},
        register_error: null
      };
    }
    case UsersActions.REGISTER_SUCCESS: {
      return {
        register: state.register,
        register_error: null
      };
    }
    case UsersActions.REGISTER_ERROR: {
      return {
        register: null,
        register_error: action.payload.error // Or any other property inside err?
      };
    }
    case AuthenticationActions.LOGIN_SUCCESS: {
      // Removes register data if exists
      return {
        register: null,
        register_error: null
      };
    }
  }
  return state;
}
