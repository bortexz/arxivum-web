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
  files: IUploadingFile[]; // ng2-uploader items
  progress: number;
};

export function uploaderReducer (state = null, action) {
  let files;
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
      files = state.files.map(item => {
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
        files: state.files,
        progress: action.payload.progress
      };

    case UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM:
      return state;
  }
  return state;
}
