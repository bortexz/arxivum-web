import { Injectable } from '@angular/core';
@Injectable()
export class FolderTreeActions {
  static GET_TREE = '[tree] Get tree';
  static GET_TREE_SUCCESS = '[tree] Get tree success';
  static GET_TREE_ERROR = '[tree] Get tree error';

  getTree () {
    return {
      type: FolderTreeActions.GET_TREE
    };
  }

  getTreeSuccess (tree) {
    return {
      type: FolderTreeActions.GET_TREE_SUCCESS,
      payload: { tree }
    };
  }

  getTreeError (error) {
    return {
      type: FolderTreeActions.GET_TREE_ERROR,
      payload: { error }
    };
  }
}
