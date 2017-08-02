import { ReadStream } from 'fs';
import { DownloaderActions } from './downloader.actions';
const R = require('ramda');
import {
  assign,
  replaceFileInList,
  filterFile
} from '../../utils/functional';

export interface IDownloadingFile {
  _id: string;
  name: string;
  torrent: any;
  torrent_file: any;
  torrent_info: any;
  finished?: Boolean;
  read_stream?: ReadStream;
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
    // case DownloaderActions.DOWNLOAD_FILE_DECRYPTING: {
    //   const { _id } = action.payload;
    //   return assign({
    //       files: replaceFileInList(_id)
    //         ( item => assign({ decrypting: true })(item) )
    //         ( files )
    //     })(state);
    // }
    // case DownloaderActions.DOWNLOAD_FILE_DECRYPTING_SUCCESS: {
    //   const { _id, stream } = action.payload;
    //   return assign({
    //       files: replaceFileInList(_id)
    //         ( item => assign({ decrypting: false, decrypted: stream })(item) )
    //         ( files )
    //     })(state);
    // }
    // case DownloaderActions.DOWNLOAD_FILE_DECRYPTING_ERROR: {
    //   const { _id } = action.payload;
    //   return assign({
    //       files: replaceFileInList(_id)
    //         ( item => assign({ decrypting: false })(item) )
    //         ( files )
    //     })(state);
    // }
    case DownloaderActions.REMOVE_FILE: {
      const { _id } = action.payload.file;
      return assign( { files: filterFile(_id)(files) } )(state);
    }
  }
  return state;
}
