import { Action } from '@ngrx/store';
// Actions for app-wide errors

export const APP_NOTIFICATION = '[Notifications] App notification';
export class AppNotification implements Action {
  readonly type = APP_NOTIFICATION;
  constructor(public message) {}
}

export const REMOVE_NOTIFICATION = '[Notifications] Remove notification'
export class RemoveNotification implements Action {
  readonly type = REMOVE_NOTIFICATION;
  constructor(public index) {}
}
