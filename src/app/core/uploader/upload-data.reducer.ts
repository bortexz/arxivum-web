import * as  UploaderActions from './uploader.actions';
const R = require('ramda');

// Map where the key is the file object inside uploader, value will be progress.
export type UploadDataState = Map<Object, number>;

const initialState: UploadDataState = new Map();

export function uploadDataReducer (state, action) {
  switch (action.type) {
    case UploaderActions.UPDATE_QUEUE:
      const newState = new Map();
      R.forEach(
        item => newState.set(item.file, item.progress || 0),
        action.queue
      )
      return newState;

    case UploaderActions.UPDATE_FILE_PROGRESS: {
      const item = action.file;
      state.set(item.file, item.progress);
      return new Map(state);
    }

    case UploaderActions.CLEAR_QUEUE:
      return new Map();

  }
  return state;
}
