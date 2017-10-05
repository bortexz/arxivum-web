// import { nameFormModalReducer, NameFormState } from './reducers/name-form-modal.reducer';
import * as ModalsActions from './modals.actions';
import { Action, combineReducers } from '@ngrx/store';
import { IFolder } from '../folders/folders.interfaces';
import { IFile } from '../files/files.interfaces';
const R = require('ramda');

export type ModalsState = ModalsActions.CloseModal | ModalsActions.NewFolder | null;

// The state of the modal goes to the action itself, that will be used
// by the modals services to pick the information they need.
export function modalsReducer (state = null, action) {
  switch (action.type) {
    case ModalsActions.CLOSE_MODAL: return null;

    // Fallthrough, all those do return action
    case ModalsActions.NEW_FOLDER:
    case ModalsActions.UPDATE_FILE:
    case ModalsActions.UPDATE_FOLDER:
    case ModalsActions.DELETE_FOLDER:
    case ModalsActions.INVITE_USER:
    case ModalsActions.DELETE_FILE:
    case ModalsActions.DELETE_INVITATION:
    return action;
  }
  return state;
}
