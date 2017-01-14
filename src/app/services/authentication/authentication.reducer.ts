import { Action, ActionReducer } from '@ngrx/store';
import { AuthenticationActions } from './authentication.actions';
import { Store } from '@ngrx/store';

export interface AuthenticationState {
  email: string;
  token: string;
  admin?: Boolean;
};

const initialState: AuthenticationState = null;

export function authReducer (state: AuthenticationState = initialState, action: Action) {
  switch (action.type) {
    case AuthenticationActions.LOGIN: {
      return null;
    }

    case AuthenticationActions.LOGIN_SUCCESS: {
      return action.payload;
    }

    case AuthenticationActions.LOGIN_ERROR: {
      return null;
    }

    case AuthenticationActions.LOGOUT: {
      return null;
    }
  }
  return state;
};
