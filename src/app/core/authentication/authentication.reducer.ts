import { ActionReducer } from '@ngrx/store';
import * as AuthActions from './authentication.actions';
import { Store } from '@ngrx/store';

type Action = AuthActions.All;

export interface AuthenticationState {
  email: string;
  token: string;
  admin?: Boolean;
};

const initialState: AuthenticationState = null;

export function authReducer (state: AuthenticationState = initialState, action: Action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      return action.payload;
    }

    case AuthActions.LOGOUT: {
      return null;
    }
  }
  return state;
};
