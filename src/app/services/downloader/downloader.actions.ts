import { IDownloadingFile } from '../downloader/downloader.reducer';
import { IFile } from '../files/files.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class DownloaderActions {
  static DOWNLOAD_FILE: '[Downloader] Download file';
  static DOWNLOAD_FILE_ADDED: '[Downloader] Downloader file added';
  static DOWNLOAD_FILE_PROGRESS_ITEM: '[Downloader] Download file progress';
  static DOWNLOAD_FILE_COMPLETED: '[Downloader] Download file completed';

  downloadFile (file: IFile) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE,
      payload: { file }
    };
  }

  downloadFileAdded (file: IDownloadingFile) {
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

  downloadFileCompleted (_id) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE_COMPLETED,
      payload: { _id }
    };
  }

}
