import { Injectable } from '@angular/core';

@Injectable()
export class FoldersActions {
  static GET_FOLDER = '[Folders] Get folder';
  static GET_FOLDER_SUCCESS = '[Folders] Get folder success';
  static GET_FOLDER_ERROR = '[Folders] Get folder error';

  static CREATE_FOLDER = '[Folders] Create folder';
  static CREATE_FOLDER_SUCCESS = '[Folders] Create folder success';
  static CREATE_FOLDER_ERROR = '[Folders] Create folder error';

  getFolder (id) {
    return {
      type: FoldersActions.GET_FOLDER,
      payload: { id }
    };
  }

  getFolderSuccess (data) {
    return {
      type: FoldersActions.GET_FOLDER_SUCCESS,
      payload: data
    };
  }

  getFolderError (error) {
    return {
      type: FoldersActions.GET_FOLDER_ERROR,
      payload: { error }
    };
  }

  createFolder (data) {
    return {
      type: FoldersActions.CREATE_FOLDER,
      payload: data
    };
  }

  createFolderSuccess (data) {
    return {
      type: FoldersActions.CREATE_FOLDER_SUCCESS,
      payload: data
    };
  }

  createFolderError (error) {
    return {
      type: FoldersActions.CREATE_FOLDER_ERROR,
      payload: { error }
    };
  }
}
