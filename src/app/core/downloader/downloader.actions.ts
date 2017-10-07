import { Action } from '@ngrx/store';

export const ADD_DOWNLOADING_FILE = '[Downloader] Add download file';
export class AddDownloadFile implements Action {
  readonly type = ADD_DOWNLOADING_FILE;
  constructor (public file) {}
}

export const FILE_PROGRESS = '[Downloader] File progress'; // id, progress, downloadspeed
export class FileProgress implements Action {
  readonly type = FILE_PROGRESS;
  constructor (public id, public progress, public downloadSpeed?) {};
}

export const TOTAL_PROGRESS = '[Downloader] Total progress'; // progress, speed?
export class TotalProgress implements Action {
  readonly type = TOTAL_PROGRESS;
  constructor(public progress) {}
}

export const FILE_COMPLETE = '[Downloader] File complete'; // id
export class FileComplete implements Action {
  readonly type = FILE_COMPLETE;
  constructor (public id) {}
}

export const REMOVE_FILE = '[Downloader] Remove file'; // file
export class RemoveFile implements Action {
  readonly type = REMOVE_FILE;
  constructor (public file) {};
}

export const SAVE_FILE = '[Downloader] Save file'
export class SaveFile implements Action {
  readonly type = SAVE_FILE;
  constructor (public file) {}
}

export const START_DECRYPTING = '[Downloader] Start decrypting';
export class StartDecrypting implements Action {
  readonly type = START_DECRYPTING;
  constructor (public file) {}
}

export const FINISHED_DECRYPTING = '[Downloader] Finished decrypting';
export class FinishedDecrypting implements Action {
  readonly type = FINISHED_DECRYPTING;
  constructor (public file) {}
}
