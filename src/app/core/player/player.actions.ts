import { IDownloadingFile } from '../downloader/downloader.reducer';
import { Action } from '@ngrx/store';
// import { Injectable } from '@angular/core';
// import { Type } from '../../utils/ngrx-actions/types';
// import { IDownloadingFile } from 'app/core/downloader/downloader.reducer';
// import { IFile } from 'app/core/files/files.interfaces';

// @Injectable()
// export class PlayerActions {
//   @Type static PLAY_FILE;
//   playFile = (file: IFile) => ({ type: PlayerActions.PLAY_FILE, payload: { file }});

//   @Type static PLAY_FILE_READY;
//   playFileReady = (file: IDownloadingFile) => ({ type: PlayerActions.PLAY_FILE_READY, payload: { file }});
// }

export const PLAY_FILE = '[Player] Play file';
export class PlayFile implements Action {
  readonly type = PLAY_FILE;
  constructor(public file: IDownloadingFile, public key: Uint8Array, public size: number) {};
}

export const CLEAR_PLAYER = '[Player] Clear player'
export class ClearPlayer implements Action {
  readonly type = CLEAR_PLAYER;
}
