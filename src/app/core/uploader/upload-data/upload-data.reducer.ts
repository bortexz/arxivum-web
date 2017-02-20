import { UploaderActions } from '../uploader.actions';
// Map where the key is the file object inside uploader, value will be progress.
export type UploadDataState = Map<Object, number>;

const initialState: UploadDataState = new Map();

export function uploadDataReducer (state, action) {
  switch (action.type) {
    case UploaderActions.UPLOAD_FILES_UPDATE_QUEUE:
      const newState = new Map();
      action.payload.queue.map(item => newState.set(item.file, item.progress || 0));
      return newState;

    case UploaderActions.UPLOAD_FILES_ON_PROGRESS_ITEM: {
      const item = action.payload.item;
      state.set(item.file, item.progress);
      return new Map(state);
    }

    // case UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM: break;

    case UploaderActions.UPLOAD_FILES_CLEAR_QUEUE:
      return new Map();

  }
  return state;
}
