import { DownloaderActions } from './downloader.actions';
export interface IDownloadingFile {
  _id: string;
  name: string;
  torrent: any;
  torrent_info: any;
  progress: number;
  download_speed: number;
  finished?: Boolean;
}

export interface DownloaderState {
  files: IDownloadingFile[];
  progress: number;
}

const initialState: DownloaderState = {
  files: [],
  progress: 0
};

export function downloaderReducer (state = initialState, action) {
  let files = state ? state.files : [];
  switch (action.type) {
    case DownloaderActions.DOWNLOAD_FILE:
      return state;
    case DownloaderActions.DOWNLOAD_FILE_ADDED: {
      state.files.push(action.payload.file);
      return {
        files: state.files,
        progress: state ? state.progress : 0
      };
    }
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM: {
      const {_id, progress, download_speed} = action.payload;
      files = files.map(file => {
        if (file._id === _id) {
          file.progress = progress;
          file.download_speed = download_speed;
        }
        return file;
      });
      return {
        files,
        progress: state ? state.progress : 0
      };
    }
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ALL: {
      return {
        files,
        progress: action.payload.progress
      };
    }
    case DownloaderActions.DOWNLOAD_FILE_COMPLETED: {
      const { _id } = action.payload;
      files = files.map(file => {
        if (file._id === _id) {
          file.finished = true;
        }
        return file;
      });
      return {
        files,
        progress: state ? state.progress : 0
      };
    }
    case DownloaderActions.REMOVE_ITEM: {
      const { file } = action.payload;
      files = files.filter(item => item !== file);
      return {
        files,
        progress: state ? state.progress : 0
      };
    }
  }
  return state;
}
