import { FolderTreeActions } from './tree.actions';
import { FoldersActions } from '../folders.actions';
import { IFolderTreeNode } from '../folders.interfaces';

export interface FolderTreeState {
  tree: IFolderTreeNode[];
  view_tree: any[]; // With view properties like selected, expanded, etc..
}

const initialState: FolderTreeState = {
  tree: [],
  view_tree: null
};

export function folderTreeReducer (state = initialState, action): FolderTreeState {
  switch (action.type) {
    case FolderTreeActions.GET_TREE: break;
    case FolderTreeActions.GET_TREE_SUCCESS: {
      return {
        tree: action.payload.tree,
        view_tree: null
      };
    }
    case FolderTreeActions.GET_TREE_ERROR: break;
  }
  return state;
}
