import { Injectable } from '@angular/core';
import { Type } from '../../utils/ngrx-actions/types';
import { IDownloadingFile } from 'app/core/downloader/downloader.reducer';
import { IFile } from 'app/core/files/files.interfaces';

@Injectable()
export class PlayerActions {
  @Type static PLAY_FILE;
  playFile = (file: IFile) => ({ type: PlayerActions.PLAY_FILE, payload: { file }});

  @Type static PLAY_FILE_READY;
  playFileReady = (file: IDownloadingFile) => ({ type: PlayerActions.PLAY_FILE_READY, payload: { file }});
}
