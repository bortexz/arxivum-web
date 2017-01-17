import { UploaderActions } from './uploader.actions';

export interface IUploadingFile {
  file: {
    name: string;
    size: number;
    type: string;
  };
  progress: number;
}

export interface UploaderState {
  files: IUploadingFile[];
  progress: number;
};

const initialState: UploaderState = {
  files: [],
  progress: 0
};

export function uploaderReducer (state = null, action) {
  let files = state ? state.files : [];
  switch (action.type) {
    case UploaderActions.UPLOAD_FILES:
      return state;

    case UploaderActions.UPLOAD_FILES_UPDATE_QUEUE:
      files = action.payload.queue.map(item => {
        return {
          file: item.file,
          progress: item.progress
        };
      });

      return {
        files,
        progress: state ? state.progress : 0
      };


    case UploaderActions.UPLOAD_FILES_ON_PROGRESS_ITEM:
      files.map(item => {
        if (item.file === action.payload.item.file) {
          item.progress = action.payload.item.progress;
        }
        return item;
      });
      return {
        files,
        progress: state ? state.progress : 0
      };

    case UploaderActions.UPLOAD_FILES_ON_PROGRESS_ALL:
      return {
        files,
        progress: action.payload.progress
      };

    case UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM:
      return state;

  }
  return state;
}
