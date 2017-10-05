import { Action } from '@ngrx/store';
// Actions for app-wide errors

export const APP_ERROR = '[Errors] App error';
export class AppError implements Action {
  readonly type = APP_ERROR;
  constructor(public message) {}
}

export const REMOVE_ERROR = '[Errors] Remove error';
export class RemoveError implements Action {
  readonly type = REMOVE_ERROR;
  constructor(public index) {}
}
