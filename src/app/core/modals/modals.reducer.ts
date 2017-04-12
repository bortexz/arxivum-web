import { nameFormModalReducer, NameFormState } from './reducers/name-form-modal.reducer';
import { ModalsActions } from './modals.actions';
import { Action, combineReducers } from '@ngrx/store';
import { IFolder } from '../folders/folders.interfaces';
import { IFile } from '../files/files.interfaces';
const R = require('ramda');

export interface ModalsState {
  nameForm: NameFormState;
}

const initialState: ModalsState = {
  nameForm: null
};

const assign = R.flip(R.merge);

export const combined = combineReducers({
  nameForm: nameFormModalReducer
});

export function modalsReducer(state = initialState, action) {
  return combined(state, action);
};
