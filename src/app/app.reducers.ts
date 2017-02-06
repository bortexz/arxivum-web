import { usersReducer, UsersState } from './core/users/users.reducer';
import { downloaderReducer, DownloaderState } from './core/downloader/downloader.reducer';
import { uploaderReducer, UploaderState } from './core/uploader/uploader.reducer';
import { CurrentFolderState, foldersReducer } from './core/folders/folders.reducer';
import { AuthenticationState, authReducer } from './core/authentication/authentication.reducer';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

const debug = require('debug')('arxivum:state-logger');

export interface AppState {
    authenticated: AuthenticationState;
    currentFolder: CurrentFolderState;
    uploading: UploaderState;
    downloading: DownloaderState;
    users: UsersState; // contains register data
};

// Take into account
// https://github.com/ngrx/store/issues/190
export function reducers (state, action) {
  const newState = compose(localStorageSync(['authenticated'], true), combineReducers)({
    authenticated: authReducer,
    currentFolder: foldersReducer,
    uploading: uploaderReducer,
    downloading: downloaderReducer,
    users: usersReducer
  })(state, action);

  debug(newState);

  return newState;
};
