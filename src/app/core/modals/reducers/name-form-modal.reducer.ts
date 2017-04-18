import { ModalsActions } from '../modals.actions';
import { Action } from '@ngrx/store';
import { IFile } from '../../files/files.interfaces';
import { IFolder } from '../../folders/folders.interfaces';

export const UPDATE_FILE_TITLE = 'Edit file name';
export const NEW_FOLDER_TITLE = 'New folder';
export const UPDATE_FOLDER_TITLE = 'Edit folder name';

export interface NameFormState {
  open: boolean;
  entity?: IFile | IFolder;
  title?: string;
  trigger?: Action; // Save action that triggered current state
}

const initialState: NameFormState = { open: false };

export function nameFormModalReducer(state = initialState, action) {
  switch (action.type) {
    case ModalsActions.UPDATE_FILE_NAME:
      return {
        open: true,
        entity: action.payload,
        title: UPDATE_FILE_TITLE,
        trigger: action.type
      };
    case ModalsActions.NEW_FOLDER:
      return {
        open: true,
        title: NEW_FOLDER_TITLE,
        trigger: action.type
      };
    case ModalsActions.UPDATE_FOLDER_NAME:
      return {
        open: true,
        entity: action.payload,
        title: UPDATE_FOLDER_TITLE,
        trigger: action.type
      };
    case ModalsActions.CLOSE_NAME_FORM_MODAL:
      return { open: false };
  }
  return state;
};
