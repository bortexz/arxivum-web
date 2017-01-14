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
  [index: number]: any; // ng2-uploader items
};

export function uploaderReducer (state = [], action) {
  switch (action.type) {
    case UploaderActions.UPLOAD_FILES:
      return state;

    case UploaderActions.UPLOAD_FILES_UPDATE_QUEUE:
      return action.payload.queue.map(item => {
        return {
          file: item.file,
          progress: item.progress
        };
      });

    case UploaderActions.UPLOAD_FILES_ON_PROGRESS_ITEM:
      console.log(action.payload);
      // return state.map(item => {
      //   if (item.file === action.payload.item.file) {
      //     item.progress = action.payload.item.progress;
      //   }
      //   return item;
      // });

    case UploaderActions.UPLOAD_FILES_ON_SUCCESS_ITEM:
      return state;
  }
  return state;
}
