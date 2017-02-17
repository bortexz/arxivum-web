import { DownloaderActions } from './downloader.actions';
const R = require('ramda');

export interface IDownloadingFile {
  _id: string;
  name: string;
  torrent: any;
  torrent_file: any;
  torrent_info: any;
  progress: number;
  download_speed: number;
  finished?: Boolean;
  decrypting?: boolean;
  decrypted?: ArrayBuffer;
}

export interface DownloaderState {
  files: IDownloadingFile[];
  progress: number;
}

const initialState: DownloaderState = {
  files: [],
  progress: 0
};

/**
 * returns a new Object result from assigning a new property to the object provided
 *
 * * note: R.flip ensures the new property overrides the previous one if it existed.
 */
const assign = R.flip(R.merge);

/**
 * Returns a new array of files where the file passed is filtered
 * file: the file to be filtered.
 */
const filterFile = R.curry((id, files) =>
  R.filter((item) => item._id !== id)(files));

/**
 * Returns a new array of files where one file has been replaced
 * id: id of the file to be replaced
 * getReplacement: Function with signature file => file, used to get the new value of the file.
 * files: list of the files where to replace the file.
 */
const replaceFileInList = R.curry((id, getReplacement, files) =>
  R.map((item) => item._id === id ? getReplacement(item) : item)(files));

export function downloaderReducer (state = initialState, action) {
  const { files } = state;
  switch (action.type) {
    case DownloaderActions.DOWNLOAD_FILE:
      return state;
    case DownloaderActions.DOWNLOAD_FILE_ADDED: {
      const { file } = action.payload;
      return assign({
        files: R.append(file)(files)
      })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ITEM: {
      const {_id, progress, download_speed} = action.payload;

      return assign({
        files: replaceFileInList(_id)
          ( item => assign({progress, download_speed})(item) )
          (files)
      })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_PROGRESS_ALL: {
      return assign({ progress: action.payload.progress })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_COMPLETED: {
      const { _id } = action.payload;

      return assign({
          files: replaceFileInList(_id)
            (file => assign({finished: true})(file))
            (files)
        })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_DECRYPTING: {
      const { _id } = action.payload;
      return assign({
          files: replaceFileInList(_id)
            ( item => assign({ decrypting: true })(item) )
            ( files )
        })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_DECRYPTING_SUCCESS: {
      const { _id, stream } = action.payload;
      return assign({
          files: replaceFileInList(_id)
            ( item => assign({ decrypting: false, decrypted: stream })(item) )
            ( files )
        })(state);
    }
    case DownloaderActions.DOWNLOAD_FILE_DECRYPTING_ERROR: {
      const { _id } = action.payload;
      return assign({
          files: replaceFileInList(_id)
            ( item => assign({ decrypting: false })(item) )
            ( files )
        })(state);
    }
    case DownloaderActions.REMOVE_FILE: {
      const { _id } = action.payload.file;
      return assign( { files: filterFile(_id)(files) } )(state);
    }
  }
  return state;
}
