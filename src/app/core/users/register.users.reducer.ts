import { AuthenticationActions } from '../authentication/authentication.actions';
import { UsersActions } from './users.actions';
import { IUser } from './users.interfaces';

export interface IRegisterData {
  email: string;
  password: string;
}

export interface RegisterState {
  register: IRegisterData;
  register_error: Error;
};

const initialState: RegisterState = {
  register: null,
  register_error: null
};

export function registerReducer (state = initialState, action): RegisterState {
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
