import { FoldersActions } from './folders.actions';
import { IFolder } from './folders.interfaces';
import { IFile } from '../files/files.interfaces';
import { FilesActions } from '../files/files.actions';

export interface CurrentFolderState {
  _id: string;
  name: string;
  files: IFile[];
  folders: IFolder[];
  path: IFolder[];
};

const initialState: CurrentFolderState = null;

export function foldersReducer (state = initialState, action) {
  switch (action.type) {
    case FoldersActions.GET_FOLDER:
    case FoldersActions.GET_FOLDER_SUCCESS: {
      const {_id, name, files, folders, ancestors} = action.payload;

      let path = ancestors ? [...ancestors] : [];

      if (_id) {
        path.push({_id: _id, name: name});
      }

      // Add arxivum as first item in path
      path.unshift({name: 'Arxivum'});

      return {files, folders, path, _id, name};
    }
    case FoldersActions.GET_FOLDER_ERROR:
    case FoldersActions.CREATE_FOLDER:
    case FoldersActions.CREATE_FOLDER_SUCCESS:
    case FoldersActions.CREATE_FOLDER_ERROR:
  }
  return state;
}
