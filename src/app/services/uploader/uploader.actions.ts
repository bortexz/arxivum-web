import { Injectable } from '@angular/core';

@Injectable()
export class UploaderActions {
  static UPLOAD_FILES = '[Uploader] Upload files';
  static UPLOAD_FILES_UPDATE_QUEUE = '[Uploader] Upload files update queue';
  static UPLOAD_FILES_ON_PROGRESS_ITEM = '[Uploader] Upload files on progress';
  static UPLOAD_FILES_ON_SUCCESS_ITEM = '[Uploader] Upload files on success item';

  uploadFiles () {
    return {
      type: UploaderActions.UPLOAD_FILES
    };
  }

  uploadFilesUpdateQueue (queue) {
    return {
      type: UploaderActions.UPLOAD_FILES_UPDATE_QUEUE,
      payload: { queue }
    };
  }

  uploadFilesOnProgressItem (item) {
    return {
      type: UploaderActions.UPLOAD_FILES_ON_PROGRESS_ITEM,
      payload: { item }
    };
  }

  uploadFilesOnSuccessItem (item) {
    return {
      type: UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM,
      payload: { item }
    };
  }
}
