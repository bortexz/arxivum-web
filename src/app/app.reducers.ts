import { InvitationsListState, invitationsReducer } from './core/invitations/invitations.reducer';
import { adminUsersReducer, AdminUsersState } from './core/users/admin.users.reducer';
import { registerReducer, RegisterState } from './core/users/users.register.reducer';
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
    admin_users: AdminUsersState;
    register: RegisterState;
    invitations: InvitationsListState;
};

// Take into account
// https://github.com/ngrx/store/issues/190
export function reducers (state, action) {
  const newState = compose(localStorageSync(['authenticated'], true), combineReducers)({
    authenticated: authReducer,
    currentFolder: foldersReducer,
    uploading: uploaderReducer,
    downloading: downloaderReducer,
    admin_users: adminUsersReducer,
    register: registerReducer,
    invitations: invitationsReducer
  })(state, action);

  debug(newState);

  return newState;
};
