import { playerReducer, PlayerState } from './core/player/player.reducer';
import { modalsReducer, ModalsState } from './core/modals/modals.reducer';
import { uploadDataReducer, UploadDataState } from './core/uploader/upload-data/upload-data.reducer';
import { downloadDataReducer, DownloadDataState } from './core/downloader/download-data/download-data.reducer';
import { folderTreeReducer, FolderTreeState } from './core/folders/tree/tree.reducer';
import { InvitationsListState, invitationsReducer } from './core/invitations/invitations.reducer';
import { adminUsersReducer, AdminUsersState } from './core/users/admin/admin-users.reducer';
import { registerReducer, RegisterState } from './core/users/register/register.reducer';
import { downloaderReducer, DownloaderState } from './core/downloader/downloader.reducer';
import { uploaderReducer, UploaderState } from './core/uploader/uploader.reducer';
import { CurrentFolderState, foldersReducer } from './core/folders/folders.reducer';
import { AuthenticationState, authReducer } from './core/authentication/authentication.reducer';
import { combineReducers, compose } from '@ngrx/store';
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
    folderTree: FolderTreeState;
    downloadData: DownloadDataState; // Keeps real time progress updates separated from downloader.
    uploadData: UploadDataState;
    modals: ModalsState;
    player: PlayerState;
};

// Take into account
// https://github.com/ngrx/store/issues/190
export function reducers (state, action) {
  const newState = compose(localStorageSync({keys: ['authenticated'], rehydrate: true}), combineReducers)({
    authenticated: authReducer,
    currentFolder: foldersReducer,
    uploading: uploaderReducer,
    downloading: downloaderReducer,
    admin_users: adminUsersReducer,
    register: registerReducer,
    invitations: invitationsReducer,
    folderTree: folderTreeReducer,
    downloadData: downloadDataReducer,
    uploadData: uploadDataReducer,
    modals: modalsReducer,
    player: playerReducer
  })(state, action);

  return newState;
};
