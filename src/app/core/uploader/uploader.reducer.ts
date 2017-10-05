import { assign } from '../../utils/functional';
import * as UploaderActions from './uploader.actions';
const R = require('ramda');

export interface IUploadingFile {
  file: {
    name: string;
    size: number;
    type: string;
  };
}

export interface UploaderState {
  files: IUploadingFile[];
  progress: number;
};

const initialState: UploaderState = {
  files: [],
  progress: 0
};

export function uploaderReducer (state = initialState, action) {
  switch (action.type) {
    case UploaderActions.UPDATE_QUEUE:
      return assign({
        files: R.map(item => item.file, action.queue)
      }, state);

    case UploaderActions.UPDATE_TOTAL_PROGRESS:
      return assign({ progress: action.progress }, state);

    case UploaderActions.CLEAR_QUEUE:
      return {
        files: [],
        progress: 0
      };
  }
  return state;
}
