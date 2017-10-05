import * as FoldersActions from './folders.actions';
import { IFolder } from './folders.interfaces';
import { IFile } from '../files/files.interfaces';
// import { FilesActions } from '../files/files.actions';

export interface CurrentFolderState {
  _id: string;
  name?: string;
  files?: IFile[];
  folders?: IFolder[];
  path?: IFolder[];
};

const initialState: CurrentFolderState = null;

export function foldersReducer (state = initialState, action) {
  switch (action.type) {
    case FoldersActions.GO_TO_FOLDER:
      // Put the id
      return {_id: action.id }
    case FoldersActions.UPDATE_FOLDER_LIST:
      const {_id, name, files, folders, ancestors} = action.payload;

      const path = ancestors ? [...ancestors] : [];

      if (_id) {
        path.push({_id: _id, name: name});
      }

      // Add arxivum as first item in path
      path.unshift({name: 'Arxivum'});

      return {files, folders, path, _id, name};
  }
  return state;
}
