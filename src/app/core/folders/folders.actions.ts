import { FoldersService } from './folders.service';
import { Type } from '../../utils/ngrx-actions/types';
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

  @Type static UPDATE;
  @Type static UPDATE_OK;
  @Type static UPDATE_ERROR;
  update = (id, data) => ({
    type: FoldersActions.UPDATE,
    payload: { id, data },
    meta: {
      async_request: {
        req: ({ payload }) => this.foldersApi.update(payload.id, payload.data),
        success: (payload) => ({ type: FoldersActions.UPDATE_OK, payload }),
        err: (error) => ({ type: FoldersActions.UPDATE_ERROR, error })
      }
    }
  })

  @Type static DELETE;
  @Type static DELETE_OK;
  @Type static DELETE_ERR;
  delete = (id) => ({
    type: FoldersActions.DELETE,
    payload: { id },
    meta: {
      async_request: {
        req: ({ payload }) => this.foldersApi.delete(payload.id),
        success: (payload) => ({ type: FoldersActions.DELETE_OK, payload }),
        err: (error) => ({ type: FoldersActions.DELETE_ERR, error })
      }
    }
  })

  constructor(
    private foldersApi: FoldersService
  ) {}
}
