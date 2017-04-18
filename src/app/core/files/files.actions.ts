import { Action } from '../../utils/ngrx-actions/action';
import { FilesService } from './files.service';
import { Injectable } from '@angular/core';
import { AsyncAction } from '../../utils/ngrx-actions/async-action';
import { Types, Type } from '../../utils/ngrx-actions/types';

@Injectable()
export class FilesActions {

  @Types
  static types;

  @Type static DELETE;
  @Type static DELETE_OK;
  @Type static DELETE_ERR;
  delete = (id) => ({
    type: FilesActions.DELETE,
    payload: { id },
    meta: {
      async_request: {
        req: ({ payload }) => this.fileApi.remove(id),
        success: () => ({ type: FilesActions.DELETE_OK }),
        error: (error) => ({ type: FilesActions.DELETE_ERR, error })
      }
    }
  })

  @Type static UPDATE;
  @Type static UPDATE_OK;
  @Type static UPDATE_ERR;
  update = (id, data) => ({
    type: FilesActions.UPDATE,
    payload: { id, data },
    meta: {
      async_request: {
        req: ({ payload }) => this.fileApi.update(payload.id, payload.data),
        success: (payload) => ({ type: FilesActions.UPDATE_OK, payload }),
        error: (error) => ({ type: FilesActions.UPDATE_ERR, error})
      }
    }
  })

  constructor(private fileApi: FilesService) { }

}
