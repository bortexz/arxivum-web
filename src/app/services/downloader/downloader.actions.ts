import { Injectable } from '@angular/core';

@Injectable()
export class DownloaderActions {
  static DOWNLOAD_FILE: '[Downloader] Download file';
  static DOWNLOAD_FILE_ADDED: '[Downloader] Downloader file added';
  static DOWNLOAD_FILE_PROGRESS_ITEM: '[Downloader] Download file progress';

  downloadFile (file) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE,
      payload: { file }
    };
  }

  downloadFileAdded (file) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE_ADDED,
      payload: { file }
    };
  }

  downloadFileProgressItem (_id, progress, download_speed) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM,
      pyaload: {
        _id,
        progress,
        download_speed
      }
    };
  }

}
