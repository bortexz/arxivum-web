import { Injectable } from '@angular/core';
import { AuthenticationState } from './authentication.reducer';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthenticationActions {
  static LOGIN = '[Authentication] Login';
  static LOGIN_SUCCESS = '[Authentication] Login success';
  static LOGIN_ERROR = '[Authentication] Login error';
  static LOGOUT = '[Authentication] Logout';

  login (email, password): Action {
    return {
      type: AuthenticationActions.LOGIN,
      payload: {
        email,
        password
      }
    };
  }

  logout () {
    return {
      type: AuthenticationActions.LOGOUT
    };
  }

  loginSuccess (authenticated: AuthenticationState) {
    return {
      type: AuthenticationActions.LOGIN_SUCCESS,
      payload: authenticated
    };
  }

  loginError (error) {
    return {
      type: AuthenticationActions.LOGIN_ERROR,
      payload: {
        error
      }
    };
  }

}
