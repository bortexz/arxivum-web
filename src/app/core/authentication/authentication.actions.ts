import { Injectable } from '@angular/core';
import { AuthenticationState } from './authentication.reducer';
import { Action } from '@ngrx/store';

export const LOGOUT = '[Authentication] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
}

export const LOGIN_SUCCESS = '[Authentication] Login success';
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AuthenticationState) {}
}

export type All = Logout | LoginSuccess;
