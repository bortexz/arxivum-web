import { uploaderReducer, UploaderState } from './services/uploader/uploader.reducer';
import { CurrentFolderState, foldersReducer } from './services/folders/folders.reducer';
import { AuthenticationState, authReducer } from './services/authentication/authentication.reducer';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
    authenticated: AuthenticationState;
    currentFolder: CurrentFolderState;
    uploading: UploaderState;
};

// Take into account
// https://github.com/ngrx/store/issues/190
export function reducers (state, action) {
  console.log(state, action);
  return compose(localStorageSync(['authenticated'], true), combineReducers)({
    authenticated: authReducer,
    currentFolder: foldersReducer,
    uploading: uploaderReducer
  })(state, action);
};
