import * as DownloaderActions from './downloader.actions';
const R = require('ramda');

const assign = R.flip(R.merge);

export interface DownloadDataItem {
  progress: number;
  download_speed?: number;
  finished?: boolean;
}

/**
 * This reducer will be used for data that is constantly changing in real time.
 */
export interface DownloadDataState {
  [key: string]: DownloadDataItem;
}

const initialState: DownloadDataState = {};

export function downloadDataReducer (state = initialState, action) {
  switch (action.type) {
    case DownloaderActions.FILE_PROGRESS: {
      const {id, progress, download_speed} = action;
      return assign({
        [id]: {progress, download_speed}
      })(state);
    }
    case DownloaderActions.FILE_COMPLETE: {
      const { id } = action;
      return assign({
        [id]: assign({finished: true}, state[id])
      })(state);
    }

    case DownloaderActions.REMOVE_FILE:
      return R.dissoc(action.file._id)(state);
  }
  return state;
}
