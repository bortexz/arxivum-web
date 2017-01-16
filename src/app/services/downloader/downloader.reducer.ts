import { DownloaderActions } from './downloader.actions';
export interface IDownloadingFile {
  id: string;
  name: string;
  torrent: any;
  torrent_info: any;
  progress: number;
  download_speed: number;
}

export interface DownloaderState {
  files: IDownloadingFile[];
}

export function downloaderReducer (state, action) {
  switch (action.type) {
    case DownloaderActions.DOWNLOAD_FILE:
      return state;
    case DownloaderActions.DOWNLOAD_FILE_ADDED:
      state.files.push(action.payload.file);
      return {
        files: state.files
      };
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM:
      // Search by id, add progress and download_speed
    case DownloaderActions.DOWNLOAD_FILE_COMPLETED:

  }
  return state;
}
