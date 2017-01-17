import { IDownloadingFile } from '../downloader/downloader.reducer';
import { IFile } from '../files/files.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class DownloaderActions {
  static DOWNLOAD_FILE = '[Downloader] Download file';
  static DOWNLOAD_FILE_ADDED = '[Downloader] Downloader file added';
  static DOWNLOAD_FILE_PROGRESS_ITEM = '[Downloader] Download file progress';
  static DOWNLOAD_FILE_COMPLETED = '[Downloader] Download file completed';
  static DOWNLOAD_FILE_PROGRESS_ALL = '[Downloader] Download file progress all';
  static REMOVE_ITEM = '[Downloader] Remove item';

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
      payload: {
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

  downloadFileProgressAll (progress) {
    return {
      type: DownloaderActions.DOWNLOAD_FILE_PROGRESS_ALL,
      payload: { progress }
    };
  }

  removeItem (file) {
    return {
      type: DownloaderActions.REMOVE_ITEM,
      payload: { file }
    };
  }

}
