import { commonReducer, CommonState } from './core/common/common.reducer';
import { invitationsReducer, InvitationsState } from './core/invitations/invitations.reducer';
import { usersReducer, UsersState } from './core/users/users.reducer';
import { playerReducer, PlayerState } from './core/player/player.reducer';
import { downloaderReducer, DownloaderState } from './core/downloader/downloader.reducer';
import { downloadDataReducer, DownloadDataState } from './core/downloader/download-data.reducer';
import { uploadDataReducer, UploadDataState } from './core/uploader/upload-data.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthenticationState, authReducer } from './core/authentication/authentication.reducer';
import { CurrentFolderState, foldersReducer } from './core/folders/folders.reducer';
import { modalsReducer, ModalsState } from './core/modals/modals.reducer';
import { uploaderReducer, UploaderState } from './core/uploader/uploader.reducer';

const debug = require('debug')('arxivum:state-logger');

export interface AppState {
    authenticated: AuthenticationState;
    currentFolder: CurrentFolderState;
    uploading: UploaderState;
    downloading: DownloaderState;
    users: UsersState;
    downloadData: DownloadDataState; // Keeps real time progress updates separated from downloader.
    uploadData: UploadDataState;
    modals: ModalsState;
    player: PlayerState;
    invitations: InvitationsState;
    common: CommonState;
};

export const reducers = {
    authenticated: authReducer,
    currentFolder: foldersReducer,
    uploading: uploaderReducer,
    downloading: downloaderReducer,
    users: usersReducer,
    downloadData: downloadDataReducer,
    uploadData: uploadDataReducer,
    modals: modalsReducer,
    player: playerReducer,
    invitations: invitationsReducer,
    common: commonReducer
  };

export function logger (reducer) {
  return function(state, action) {
    const res = reducer(state, action)
    debug(action.type, res);
    return res;
  }
}

export const storageSync = localStorageSync({keys: ['authenticated'], rehydrate: true})

export function storageSyncReducer (reducer) {
  return storageSync(reducer);
}

export const metaReducers = [
  logger,
  storageSyncReducer
];
