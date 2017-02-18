import { DownloaderActions } from '../downloader.actions';
const R = require('ramda');

const assign = R.flip(R.merge);

export interface DownloadDataItem {
  progress: number;
  download_speed: number;
}

/**
 * This reducer will be used for data that is constantly changing in real time.
 */
export interface DownloadDataState {
  [key: string]: DownloadDataItem;
}

const initialState: DownloadDataState = null;

export function downloadDataReducer (state = initialState, action) {
  switch (action.type) {
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM: {
      const {_id, progress, download_speed} = action.payload;

      return assign({
        [_id]: {progress, download_speed}
      })(state);
    }
    case DownloaderActions.REMOVE_FILE: {
      const { _id } = action.payload.file;
      return R.dissoc(_id)(state);
    }
  }
  return state;
}
