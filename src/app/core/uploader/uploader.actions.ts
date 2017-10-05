// Convenience action to trigger effect with latest from auth and currentFolder
export const UPLOAD_FILES = '[Uploader] Upload files';
export class UploadFiles {
  readonly type = UPLOAD_FILES;
}

export const UPDATE_QUEUE = '[Uploader] Update queue';
export class UpdateQueue {
  readonly type = UPDATE_QUEUE;
  constructor(public queue) {};
}

export const UPDATE_TOTAL_PROGRESS = '[Uploader] Update total progress';
export class UpdateTotalProgress {
  readonly type = UPDATE_TOTAL_PROGRESS;
  constructor(public progress) {};
}

export const UPDATE_FILE_PROGRESS = '[Uploader] Update file progress';
export class UpdateFileProgress {
  readonly type = UPDATE_FILE_PROGRESS;
  constructor(public file) {};
}

export const CLEAR_QUEUE = '[Uploader] Clear queue';
export class ClearQueue {
  readonly type = CLEAR_QUEUE;
}
