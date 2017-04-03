import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

export interface ActionsMetadata {
  methodName: string;
}

export interface AsyncActionsMetadata extends ActionsMetadata {
  action: (action) => Observable<any>;
}

export interface AsyncActionCreatorMetadata {
  [method: string]: {request, success, error};
}

export type ActionCreatorMetadata = (act) => Action;

// Each class that contains actions will have it's own dispatcher.
export const METADATA_DISPATCHER = 'ngrx-actions-dispatcher';
